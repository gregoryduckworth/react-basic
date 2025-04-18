const API_BASE = import.meta.env.VITE_API_URL || "";

export async function fetchApi(endpoint: string) {
  const res = await fetch(API_BASE + endpoint);
  if (!res.ok) throw new Error("API error");
  return res.json();
}
