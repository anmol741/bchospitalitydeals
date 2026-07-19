import { NextRequest, NextResponse } from "next/server";

// Server-side proxy to the GoEasyAI CRM webhook. Keeps the api_token and the
// webhook URL out of the browser bundle, and re-validates required fields so
// a direct POST to this route (bypassing the form's client-side validation)
// can't create blank CRM entries.
const GOEASYAI_URL =
  "https://admin.goeasyai.ca/api/automations/6a3c38944792f/execute";

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
};

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

  const apiToken = process.env.GOEASYAI_API_TOKEN;
  if (!apiToken) {
    console.error("submit-lead: GOEASYAI_API_TOKEN is not set");
    return NextResponse.json(
      { ok: false, error: "Server misconfiguration." },
      { status: 500 }
    );
  }

  // Same payload shape/field mapping as before — only the token's origin changed.
  const payload = {
    api_token: apiToken,
    contact_name: name,
    contact_email: email,
    contact_phone: phone,
    contact_source: body.contact_source || "BC Hospitality Deals Website",
    "{%contact.which_p_wshrbo%}": body.which_p_wshrbo || "",
    "{%contact.buyer_profile__ajl%}": body.buyer_profile__ajl || "",
    "{%contact.purchase_budget__tsm%}": body.purchase_budget__tsm || "",
    "{%contact.when_ar_jlvatx%}": body.when_ar_jlvatx || "",
    "{%contact.are_you_qnylji%}": body.are_you_qnylji || "",
    "{%contact.additio_ewnbhy%}": body.additio_ewnbhy || "",
  };

  try {
    const res = await fetch(GOEASYAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    return NextResponse.json({ ok: res.ok }, { status: res.ok ? 200 : 502 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to reach CRM." },
      { status: 502 }
    );
  }
}
