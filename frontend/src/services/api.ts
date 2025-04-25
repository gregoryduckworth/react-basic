/// <reference types="vite/client" />

import type { ApiResponse } from "@types";

const API_BASE = import.meta.env.VITE_API_URL || "";

export async function fetchApi<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = API_BASE.replace(/\/$/, "") + "/" + endpoint.replace(/^\//, "");
  const res = await fetch(url, options);
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
