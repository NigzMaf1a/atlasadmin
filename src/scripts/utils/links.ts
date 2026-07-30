const backendUrl = "http://localhost:8080";
const liveBackendUrl = "http://localhost:8080";

const links: Record<string, string> = {
  dev: backendUrl,
  prod: liveBackendUrl,
};

export function getBackendUrl(env: "dev" | "prod" = "dev"): string {
  return links[env];
}

const link = getBackendUrl("dev");
export default link;
