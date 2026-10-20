import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

// Server-side proxy to the new CRM's signed webhook. Keeps CRM_WEBHOOK_SECRET
// out of the browser bundle, and re-validates required fields so a direct
// POST to this route (bypassing the form's client-side validation) can't
// create blank CRM entries.
// CRM_WEBHOOK_URL can be set to point at a staging/mock webhook for testing.
const CRM_WEBHOOK_URL =
  process.env.CRM_WEBHOOK_URL ||
  "https://myappzbackend.com/functions/v1/workflow-webhook/ecqlf22tqecne5la";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 3;

// Best-effort in-memory rate limit. Resets whenever the serverless function
// cold-starts, so it's not a hard guarantee on Netlify, only a cheap first
// line of defense against a script hammering this route in a tight loop.
const submissionTimestampsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionTimestampsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  submissionTimestampsByIp.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

type LeadPayload = {
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_source?: string;
  which_p_wshrbo?: string;
  buyer_profile__ajl?: string;
  purchase_budget__tsm?: string;
  when_ar_jlvatx?: string;
  are_you_qnylji?: string;
  additio_ewnbhy?: string;
  // Not yet mapped to GoEasyAI custom fields; also summarized into
  // additio_ewnbhy (see trackingSummary) so they're visible either way.
  listing_title?: string;
  listing_slug?: string;
  tags?: string;
  consent?: string;
  page_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  submitted_at?: string;
};

function clean(value: unknown, max = 300): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function trackingSummary(p: Record<string, string>): string {
  const utm = [p.utm_source, p.utm_medium, p.utm_campaign].some(Boolean)
    ? `source=${p.utm_source || "-"}, medium=${p.utm_medium || "-"}, campaign=${p.utm_campaign || "-"}`
    : "none";
  return [
    p.listing_slug && `Listing: ${p.listing_title || p.which_p_wshrbo} (${p.listing_slug})`,
    `Tags: ${p.tags}`,
    p.page_url && `Page: ${p.page_url}`,
    `UTM: ${utm}`,
    `Submitted: ${p.submitted_at}`,
  ]
    .filter(Boolean)
    .join(" | ");
}

// Netlify function logs are the last-resort copy of a lead the CRM didn't accept.
function logUndeliveredLead(reason: string, payload: Record<string, string>) {
  console.error(`lead-webhook: lead NOT delivered to CRM (${reason}). Payload:`, JSON.stringify(payload));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = body.contact_name?.trim() ?? "";
  const email = body.contact_email?.trim() ?? "";
  const phone = body.contact_phone?.trim() ?? "";

  if (!name || !email || !phone) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email address." },
      { status: 400 }
    );
  }
  if (phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json(
      { ok: false, error: "Invalid phone number." },
      { status: 400 }
    );
  }

  const payload: Record<string, string> = {
    contact_name: name,
    contact_email: email,
    contact_phone: phone,
    contact_source: body.contact_source || "BC Hospitality Deals Website",
    which_p_wshrbo: body.which_p_wshrbo || "",
    buyer_profile__ajl: body.buyer_profile__ajl || "",
    purchase_budget__tsm: body.purchase_budget__tsm || "",
    when_ar_jlvatx: body.when_ar_jlvatx || "",
    are_you_qnylji: body.are_you_qnylji || "",
    additio_ewnbhy: body.additio_ewnbhy || "",
    listing_title: clean(body.listing_title),
    listing_slug: clean(body.listing_slug, 100),
    tags: clean(body.tags) || "BC Hospitality Deals",
    consent: clean(body.consent, 100),
    page_url: clean(body.page_url, 1000),
    utm_source: clean(body.utm_source, 200),
    utm_medium: clean(body.utm_medium, 200),
    utm_campaign: clean(body.utm_campaign, 200),
    submitted_at: clean(body.submitted_at, 40) || new Date().toISOString(),
  };
  payload.additio_ewnbhy = [payload.additio_ewnbhy.trim(), `[Tracking] ${trackingSummary(payload)}`]
    .filter(Boolean)
    .join("\n\n");

  const secret = process.env.CRM_WEBHOOK_SECRET;
  if (!secret) {
    console.error("lead-webhook: CRM_WEBHOOK_SECRET is not set");
    logUndeliveredLead("server misconfiguration", payload);
    return NextResponse.json(
      { ok: false, error: "Server misconfiguration." },
      { status: 500 }
    );
  }

  const serializedPayload = JSON.stringify(payload);
  const signature = crypto
    .createHmac("sha256", secret)
    .update(serializedPayload)
    .digest("hex");

  try {
    const res = await fetch(CRM_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Signature": `sha256=${signature}`,
      },
      body: serializedPayload,
    });
    const text = await res.text();
    console.log("CRM upstream status:", res.status, text);
    if (!res.ok) logUndeliveredLead(`upstream status ${res.status}`, payload);
    return new NextResponse(text, {
      status: res.status,
      headers: { "Content-Type": res.headers.get("Content-Type") ?? "application/json" },
    });
  } catch (err) {
    logUndeliveredLead(`fetch failed: ${err instanceof Error ? err.message : String(err)}`, payload);
    return NextResponse.json(
      { ok: false, error: "Failed to reach CRM." },
      { status: 502 }
    );
  }
}




