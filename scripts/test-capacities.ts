import { getStructures, requireApiKey } from "./capacities";

const apiKey = requireApiKey();

console.log("🔄 Capacities Space 구조를 조회하는 중...");

try {
  const structures = await getStructures(apiKey);
  console.log("✅ 성공적으로 Space 구조를 가져왔습니다.");

  const memoType = structures.find((s) => s.title === "Memo");
  if (!memoType) {
    console.warn("⚠️ 경고: Space에서 'Memo' 오브젝트 타입을 찾을 수 없습니다.");
    console.log("사용 가능한 오브젝트 타입 목록:");
    for (const s of structures) console.log(`- ${s.title} (ID: ${s.id})`);
    process.exit(0);
  }

  console.log(`\n📌 Memo 오브젝트 타입 정보:\n- ID: ${memoType.id}`);

  const collections = memoType.collections ?? [];
  if (collections.length === 0) {
    console.log(
      "\n⚠️ Memo 타입 아래에 컬렉션이 정의되어 있지 않습니다. Capacities 앱에서 'mcp' 컬렉션을 추가해주세요.",
    );
    process.exit(0);
  }

  console.log("\n📁 Memo 타입 내의 컬렉션 목록:");
  for (const c of collections) console.log(`- ${c.title} (ID: ${c.id})`);

  const mcp = collections.find((c) => c.title.toLowerCase() === "mcp");
  if (mcp) {
    console.log(`\n✨ 'mcp' 컬렉션을 찾았습니다! ID: ${mcp.id}`);
  } else {
    console.log(
      "\n⚠️ 'mcp' 컬렉션이 아직 없습니다. Capacities 앱 내의 'Memo' 타입 아래에 'mcp' 컬렉션을 먼저 생성해주세요.",
    );
  }
} catch (error: unknown) {
  const msg = error instanceof Error ? error.message : String(error);
  console.error("❌ 오류 발생:", msg);
  process.exit(1);
}
