import { capacitiesFetch, getStructures, requireApiKey } from "./capacities";

type TextToken = {
  type: "TextToken";
  text: string;
  style: { bold: boolean; italic: boolean };
};

type TextBlock = {
  type: "TextBlock";
  tokens: TextToken[];
};

const apiKey = requireApiKey();
const title = process.argv[2] || "Bun API 테스트 메모";
const markdownContent =
  process.argv[3] ||
  "# Bun API 테스트 메모\n\n이 메모는 **Bun 스크립트**를 통해 생성된 Capacities 메모입니다.\n\n- 마크다운 파싱이 **리치 텍스트**로 잘 변환되는지\n- 컬렉션이 **mcp**로 정상 지정되는지";

function textToken(text: string, bold = false, italic = false): TextToken {
  return { type: "TextToken", text, style: { bold, italic } };
}

/** 인라인 *** / ** / * / ___ / __ / _ 만 TextBlock으로 변환. 줄 = 블록. */
function parseMarkdownToBlocks(markdown: string): TextBlock[] {
  // 긴 구분자 우선. group1=구분자, group2=본문 (둘 다 매칭 매치 시 항상 존재)
  const styleRe = /(\*\*\*|___|\*\*|__|\*|_)(.*?)\1/g;

  return markdown.split("\n").map((line) => {
    const tokens: TextToken[] = [];
    let cursor = 0;

    for (const match of line.matchAll(styleRe)) {
      const delim = match[1];
      const body = match[2];
      if (delim === undefined || body === undefined) continue;

      if (match.index > cursor) {
        tokens.push(textToken(line.slice(cursor, match.index)));
      }

      const n = delim.length;
      tokens.push(textToken(body, n >= 2, n % 2 === 1));
      cursor = match.index + match[0].length;
    }

    if (cursor < line.length) tokens.push(textToken(line.slice(cursor)));
    if (tokens.length === 0) tokens.push(textToken(""));

    return { type: "TextBlock" as const, tokens };
  });
}

console.log(`📝 메모 작성을 시작합니다...\n- 제목: ${title}`);

try {
  console.log("🔍 Space 구조 및 컬렉션 정보를 조회하는 중...");
  const structures = await getStructures(apiKey);
  const memoType = structures.find((s) => s.title === "Memo");
  if (!memoType) {
    throw new Error(
      "오브젝트 타입 중 'Memo'를 찾을 수 없습니다. Capacities에 Memo 타입이 존재하는지 확인해주세요.",
    );
  }

  const mcpCollection = memoType.collections?.find((c) => c.title.toLowerCase() === "mcp");
  if (!mcpCollection) {
    throw new Error(
      "'mcp' 컬렉션을 'Memo' 타입 아래에서 찾을 수 없습니다. Capacities 앱에서 해당 컬렉션을 먼저 생성해주세요.",
    );
  }

  console.log(`✅ Memo: ${memoType.id}`);
  console.log(`✅ mcp: ${mcpCollection.id}`);

  console.log("🚀 빈 메모 오브젝트 생성 중...");
  const createdObject = await capacitiesFetch<{
    id: string;
    blocks?: Record<string, unknown>;
  }>("/object", apiKey, {
    method: "POST",
    body: JSON.stringify({
      structureId: memoType.id,
      properties: {
        title: { type: "title", title: { value: title } },
      },
      collections: [mcpCollection.id],
    }),
  });

  console.log(`✅ 오브젝트 생성 완료 (ID: ${createdObject.id})`);

  const contentPropertyId = Object.keys(createdObject.blocks ?? {})[0];
  if (!contentPropertyId) {
    throw new Error("생성된 오브젝트에서 본문 프로퍼티 ID를 추출할 수 없습니다.");
  }
  console.log(`✅ 본문 프로퍼티 UUID: ${contentPropertyId}`);

  console.log("🔄 마크다운 본문 기입 중...");
  await capacitiesFetch("/object", apiKey, {
    method: "PATCH",
    body: JSON.stringify({
      id: createdObject.id,
      blocks: { [contentPropertyId]: parseMarkdownToBlocks(markdownContent) },
    }),
  });

  console.log("🎉 메모 작성 및 리치 텍스트 변환 성공!");
  console.log(`- 생성된 오브젝트 ID: ${createdObject.id}`);
  console.log(`- 오브젝트 제목: ${title}`);
  console.log(`- 지정된 컬렉션: mcp (ID: ${mcpCollection.id})`);
} catch (error: unknown) {
  const msg = error instanceof Error ? error.message : String(error);
  console.error("❌ 오류 발생:", msg);
  process.exit(1);
}
