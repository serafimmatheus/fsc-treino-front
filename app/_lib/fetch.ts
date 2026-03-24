import { cookies } from "next/headers";

const getBody = async <T>(response: Response): Promise<T> => {
  const text = await response.text();
  if (!text.trim()) {
    return null as T;
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    return null as T;
  }
};

const getUrl = (contextUrl: string): string => {
  const base =
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:5555";
  const path = contextUrl.startsWith("/") ? contextUrl : `/${contextUrl}`;
  return new URL(path, base).toString();
};

const getHeaders = async (headers?: HeadersInit): Promise<HeadersInit> => {
  const _cookies = await cookies();
  return {
    ...headers,
    cookie: _cookies.toString(),
  };
};

export const customFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = await getHeaders(options.headers);

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
    credentials: "include",
  };

  const response = await fetch(requestUrl, requestInit);
  const data = await getBody<T>(response);

  return { status: response.status, data, headers: response.headers } as T;
};
