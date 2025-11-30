export const API_BASE = "http://localhost:3001";
export async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, { headers: { "Content-Type":"application/json", ...(init?.headers||{}) }, ...init });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}
