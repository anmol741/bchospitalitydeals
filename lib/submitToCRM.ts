// Returns true only when the CRM submission succeeds, so callers can gate
// success UI / conversion tracking on a real success. The signed CRM
// webhook call (and its secret) lives server-side in app/api/lead-webhook,
// so the secret is never exposed in the browser.
export const submitToCRM = async (params: Record<string, string>): Promise<boolean> => {
  try {
    const res = await fetch('/api/lead-webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
    return res.ok
  } catch {
    return false
  }
}
