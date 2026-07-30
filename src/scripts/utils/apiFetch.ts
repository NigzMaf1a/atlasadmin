import link from "./links"

const BASE_URL = link;

export default async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {

    const fullUrl =
        `${BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`


    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            "Content-Type": "application/json",

            ...({}),

            ...(options.headers ?? {}),
        },
    });

    if (!res.ok) {
        const error = await res.json()
        console.error(error)

        throw new Error(
            `Fetch failed: ${res.status} ${JSON.stringify(error)}`
        );
    }

    return (await res.json()) as T
}