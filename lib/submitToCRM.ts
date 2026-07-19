// Returns true only when the CRM submission succeeds, so callers can gate
// success UI / conversion tracking on a real success. The actual GoEasyAI
// call (and its api_token) now lives server-side in app/api/submit-lead,
// so the token is never exposed in the browser.
export const submitToCRM = async (params: Record<string, string>): Promise<boolean> => {
  try {
    const res = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
    return res.ok
  } catch {
    return false
  }
}
