export type Collection = { id: string; title: string };
export type Structure = { id: string; title: string; collections?: Collection[] };

const BASE = "https://api.capacities.io";
const API_VERSION = "1.0.0";

export function requireApiKey(): string {
  const key = Bun.env.CAPACITIES_API_KEY?.trim().replace(/^"|"$/g, "");
  if (!key) {
    console.error("❌ 에러: .env 파일에 CAPACITIES_API_KEY가 설정되지 않았습니다.");
    process.exit(1);
  }
  return key;
}

export async function capacitiesFetch<T>(
  path: string,
  apiKey: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${apiKey}`);
  headers.set("Accept", "application/json");
  headers.set("X-Capacities-Api-Version", API_VERSION);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${BASE}${path}`, { ...init, headers });
  if (!res.ok) {
    throw new Error(`API 실패 ${res.status} ${path}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

export async function getStructures(apiKey: string): Promise<Structure[]> {
  const data = await capacitiesFetch<{ structures: Structure[] }>("/space/structures", apiKey);
  return data.structures;
}
