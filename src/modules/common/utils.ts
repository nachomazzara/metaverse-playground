export function normalizeTypes(type): { request: string; success: string; failed: string } {
  return {
    request: `[Request] ${type}`,
    success: `[Success] ${type}`,
    failed: `[Failed] ${type}`
  }
}
