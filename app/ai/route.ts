/**
 * Proxy do chat para a API (Fastify) em `/ia/`, preservando cookies de sessão.
 * O cliente usa Vercel AI SDK (`useChat` → POST /ai); não usar Orval aqui.
 */
export async function POST(request: Request) {
  const base = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  if (!base) {
    return new Response(JSON.stringify({ error: "NEXT_PUBLIC_BETTER_AUTH_URL não configurada" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const url = `${base.replace(/\/$/, "")}/ia/`;
  const cookie = request.headers.get("cookie") ?? "";
  const contentType =
    request.headers.get("content-type") ?? "application/json";
  const body = await request.arrayBuffer();

  const upstream = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": contentType,
      cookie,
    },
    body,
  });

  const outHeaders = new Headers(upstream.headers);
  outHeaders.delete("transfer-encoding");

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: outHeaders,
  });
}
