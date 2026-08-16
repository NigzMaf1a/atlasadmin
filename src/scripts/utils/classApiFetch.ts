export default async function classApiFetch<T>(
  baseUrl: string,
  token: string,
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  if (!token) {
    console.error("Invalid token")
    throw new Error("Unauthorized access")
  }

  const fullUrl = `${baseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  const mergedHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...(options.headers ?? {}),
  };

  console.log({
    fullUrl,
    method: options.method,
    body: options.body
  });

  console.log("Token:", token)

  const response = await fetch(fullUrl, {
    ...options,
    headers: mergedHeaders,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Fetch failed: ${response.status} ${response.statusText} ${body}`
    )
  }

  // Read the response body once
  const body = await response.text()

  // Empty response
  if (!body.trim()) {
    return undefined as T
  }

  // JSON response
  return JSON.parse(body) as T
}