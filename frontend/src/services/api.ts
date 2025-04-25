/// <reference types="vite/client" />

const API_BASE = import.meta.env.VITE_API_URL || "";

export async function fetchApi<T = any>(
  endpoint: string,
  options: Omit<RequestInit, "body"> & { body?: unknown } = {}
): Promise<T> {
  const url = API_BASE.replace(/\/$/, "") + "/" + endpoint.replace(/^\//, "");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const body =
    options.body !== undefined ? JSON.stringify(options.body) : undefined;
  const res = await fetch(url, { ...options, headers, body });
  if (!res.ok) {
    let errorBody: any = {};
    try {
      errorBody = await res.json();
    } catch {
      errorBody = { message: await res.text() };
    }
    if (errorBody.errorKey) {
      throw { errorKey: errorBody.errorKey, status: res.status };
    }
    throw { message: errorBody.message || res.statusText, status: res.status };
  }
  return res.json();
}
