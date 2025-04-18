/// <reference types="vite/client" />

const API_BASE = import.meta.env.VITE_API_URL || "";

export async function fetchApi<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = API_BASE.replace(/\/$/, "") + "/" + endpoint.replace(/^\//, "");
  const res = await fetch(url, options);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `API error: ${res.status} ${res.statusText} - ${errorText}`
    );
  }
  return res.json();
}
