import { existsSync, readFileSync } from "node:fs";

const CHANGE_RATE_WARN = 0.3;
const CHANGE_RATE_ABORT = 0.5;

const SUMMARY_BLOCK_RE = /<!--\s*HUMANIZE-SUMMARY\b[\s\S]*/i;
const MARKUP_ONLY_LINE_RE = /^\s*(?:```.*|~~~.*|-{3,}|\*{3,}|={3,}|\|[\s:\-|]*)\s*$/;
const MARKUP_PREFIX_RE = /^\s*(?:#{1,6}\s+|>\s?|[-*+]\s+|\d{1,3}[.)]\s+)/;

export function stripSummaryBlock(text: string): string {
  return text.replace(SUMMARY_BLOCK_RE, "").trim();
}

export function stripMarkup(text: string): string {
  return text
    .split(/\r?\n/)
    .filter((line) => !MARKUP_ONLY_LINE_RE.test(line))
    .map((line) => line.replace(MARKUP_PREFIX_RE, ""))
    .join("\n");
}

function findLongestMatch(
  a: string,
  alo: number,
  ahi: number,
  b: string,
  blo: number,
  bhi: number,
): [number, number, number] {
  let bestI = alo;
  let bestJ = blo;
  let bestSize = 0;

  let j2len = new Map<number, number>();
  for (let i = alo; i < ahi; i++) {
    const newJ2len = new Map<number, number>();
    const ch = a[i];
    for (let j = blo; j < bhi; j++) {
      if (b[j] === ch) {
        const k = (j2len.get(j - 1) ?? 0) + 1;
        newJ2len.set(j, k);
        if (k > bestSize) {
          bestI = i - k + 1;
          bestJ = j - k + 1;
          bestSize = k;
        }
      }
    }
    j2len = newJ2len;
  }
  return [bestI, bestJ, bestSize];
}

function getMatchingBlocks(a: string, b: string): Array<[number, number, number]> {
  const queue: Array<[number, number, number, number]> = [[0, a.length, 0, b.length]];
  const matchingBlocks: Array<[number, number, number]> = [];

  while (queue.length > 0) {
    const item = queue.pop();
    if (!item) break;
    const [alo, ahi, blo, bhi] = item;
    const [i, j, k] = findLongestMatch(a, alo, ahi, b, blo, bhi);
    if (k > 0) {
      matchingBlocks.push([i, j, k]);
      if (alo < i && blo < j) {
        queue.push([alo, i, blo, j]);
      }
      if (i + k < ahi && j + k < bhi) {
        queue.push([i + k, ahi, j + k, bhi]);
      }
    }
  }

  matchingBlocks.sort((x, y) => (x[0] !== y[0] ? x[0] - y[0] : x[1] - y[1]));
  return matchingBlocks;
}

export function calculateChangeRate(before: string, after: string, ignoreMarkup = false): number {
  let cleanBefore = before;
  let cleanAfter = after;

  if (ignoreMarkup) {
    cleanBefore = stripMarkup(cleanBefore);
    cleanAfter = stripMarkup(cleanAfter);
  }

  if (!cleanBefore && !cleanAfter) return 0.0;
  if (!cleanBefore || !cleanAfter) return 1.0;

  const blocks = getMatchingBlocks(cleanBefore, cleanAfter);
  const matches = blocks.reduce((acc, block) => acc + block[2], 0);
  const ratio = (2.0 * matches) / (cleanBefore.length + cleanAfter.length);
  return Math.max(0.0, Math.min(1.0, 1.0 - ratio));
}

function parseCliArgs(argv: string[]) {
  let before = "";
  let after = "";
  let ignoreMarkup = false;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--before") {
      before = argv[++i] ?? "";
    } else if (arg === "--after") {
      after = argv[++i] ?? "";
    } else if (arg === "--ignore-markup") {
      ignoreMarkup = true;
    }
  }

  return { before, after, ignoreMarkup };
}

function main(): number {
  const { before, after, ignoreMarkup } = parseCliArgs(process.argv.slice(2));

  if (!before || !after) {
    console.error(
      "사용법: bun run scripts/verify-change-rate.ts --before <원문파일> --after <윤문본파일> [--ignore-markup]",
    );
    return 3;
  }

  for (const path of [before, after]) {
    if (!existsSync(path)) {
      console.error(`error: 파일 없음: ${path}`);
      return 3;
    }
  }

  const beforeText = stripSummaryBlock(readFileSync(before, "utf-8"));
  const afterText = stripSummaryBlock(readFileSync(after, "utf-8"));

  const rate = calculateChangeRate(beforeText, afterText, ignoreMarkup);
  const pct = rate * 100;

  let verdict: string;
  let exitCode: number;

  if (rate >= CHANGE_RATE_ABORT) {
    verdict = "ABORT — 강제 중단. 윤문본 채택 금지 (50% 초과)";
    exitCode = 2;
  } else if (rate >= CHANGE_RATE_WARN) {
    verdict = "WARN — 과윤문 경고. 사용자 고지 필요 (30% 이상)";
    exitCode = 1;
  } else {
    verdict = "OK — 수렴 (30% 미만)";
    exitCode = 0;
  }

  const scope = ignoreMarkup ? "본문만 (마크업 제외)" : "전문";
  console.log(`change_rate: ${pct.toFixed(1)}%  [${scope}]`);
  console.log(
    `gate: ${verdict}  (경고 ${(CHANGE_RATE_WARN * 100).toFixed(0)}% / 중단 ${(CHANGE_RATE_ABORT * 100).toFixed(0)}%)`,
  );

  return exitCode;
}

if (import.meta.main) {
  process.exit(main());
}
