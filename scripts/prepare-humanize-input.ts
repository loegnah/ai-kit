import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export interface PatternMatchCount {
  id: string;
  category: string;
  name: string;
  count: number;
}

export interface MetricSummary {
  totalChars: number;
  totalWords: number;
  totalSentences: number;
  patternMatches: PatternMatchCount[];
  totalPatternCount: number;
  routeHint: "light" | "standard" | "heavy";
  genre: string;
}

const INVISIBLE_CHARS_RE =
  /[\u00AD\u180E\u200B\u2060\uFEFF\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g;
const SPECIAL_SPACES_RE = /[\u00A0\u1680\u2000-\u200A\u202F\u205F]/g;
const CHATBOT_HEADER_RE =
  /^(?:물론입니다[.!~]?|네[,\s]+요청하신 내용입니다[.:]?|다음은 [^\n]+입니다[.:]?)\s*\n+/;
const CHATBOT_FOOTER_RE =
  /\n+(?:도움이 되셨기를 바랍니다[.!~]?|추가로 궁금한 점이 있으시면 언제든 말씀해 주세요[.!~]?|이상입니다[.!~]?)\s*$/;

export function sanitizeText(text: string): { cleaned: string; changed: boolean } {
  const original = text;
  let result = text.replace(INVISIBLE_CHARS_RE, "");
  result = result.replace(SPECIAL_SPACES_RE, " ");
  result = result.normalize("NFC");
  result = result.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  result = result.replace(/[ \t]+$/gm, "");
  result = result.replace(CHATBOT_HEADER_RE, "").replace(CHATBOT_FOOTER_RE, "");

  return { cleaned: result, changed: result !== original };
}

const TAXONOMY_RULES = [
  { id: "A-1", category: "번역투", name: "~에 대해(서)", regex: /에\s*대해(?:서)?(?=[,\s]|$)/g },
  {
    id: "A-2",
    category: "번역투",
    name: "~를 통해(서)",
    regex: /[을를]\s*통해(?:서)?(?=[,\s]|$)/g,
  },
  { id: "A-3", category: "번역투", name: "~에 있어(서)", regex: /에\s*있어(?:서)?(?=[,\s]|$)/g },
  { id: "A-7", category: "번역투", name: "가지고 있다", regex: /가지고\s*있[다네었]/g },
  { id: "A-8", category: "번역투", name: "이중 피동 (~되어지다)", regex: /되어지[다네었]/g },
  { id: "A-9", category: "번역투", name: "~에 의해", regex: /에\s*의해(?=[,\s]|$)/g },
  {
    id: "A-16",
    category: "번역투",
    name: "인칭/지시 대명사 남발",
    regex: /(?:^|[.\s])(?:그는|그녀는|그것은|그들은|이는)\s/g,
  },
  {
    id: "A-19",
    category: "번역투",
    name: "이중 조사 (~에서의/~에로의)",
    regex: /(?:에서의|에로의|으로의|로부터의)/g,
  },
  {
    id: "C-5",
    category: "서식",
    name: "이모지 사용",
    regex: /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/gu,
  },
  {
    id: "C-11",
    category: "서식",
    name: "연결어미 뒤 쉼표",
    regex: /(?:[고며]|지만|면서|아서|어서),\s*/g,
  },
  {
    id: "D-1",
    category: "관용구",
    name: "결산 피벗 (결론적으로/요약하면)",
    regex: /(?:결론적으로|요약하자면|정리하자면|결과적으로)/g,
  },
  {
    id: "D-2",
    category: "관용구",
    name: "의의 과장 (시사하는 바가 크다)",
    regex: /(?:시사하는\s*바가\s*크|주목할\s*만하|매우\s*중요하)/g,
  },
  {
    id: "D-4",
    category: "관용구",
    name: "hype 어휘 (혁신적/획기적)",
    regex: /(?:혁신적|획기적|압도적|파격적|폭발적)/g,
  },
  {
    id: "D-6",
    category: "관용구",
    name: "결말 훈계 공식 (~할 때이다)",
    regex: /(?:할\s*때이|해야\s*할\s*시점이|할\s*순간이)[다네]/g,
  },
  {
    id: "H-1",
    category: "접속사",
    name: "문두 접속사 남발",
    regex: /(?:^|[.\n]\s*)(?:또한|따라서|즉|나아가|더불어)[,\s]/g,
  },
  {
    id: "I-1",
    category: "형식명사",
    name: "~인 것이다/~한 것이다",
    regex: /(?:인|한|된)\s*것이다/g,
  },
  { id: "I-4", category: "형식명사", name: "~할 필요가 있다", regex: /할\s*필요가\s*있[다네]/g },
];

export function analyzePatterns(text: string, genre = "essay"): MetricSummary {
  const matches: PatternMatchCount[] = [];
  let totalPatternCount = 0;

  for (const rule of TAXONOMY_RULES) {
    const found = text.match(rule.regex);
    const count = found ? found.length : 0;
    if (count > 0) {
      matches.push({
        id: rule.id,
        category: rule.category,
        name: rule.name,
        count,
      });
      totalPatternCount += count;
    }
  }

  const totalChars = text.length;
  const totalWords = text.trim().split(/\s+/).filter(Boolean).length;
  const totalSentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;

  let routeHint: "light" | "standard" | "heavy" = "standard";
  if (totalPatternCount <= 2 && totalChars < 3000) {
    routeHint = "light";
  } else if (totalPatternCount >= 12 || totalChars > 12000) {
    routeHint = "heavy";
  }

  return {
    totalChars,
    totalWords,
    totalSentences,
    patternMatches: matches,
    totalPatternCount,
    routeHint,
    genre,
  };
}

function parseCliArgs(argv: string[]) {
  let text = "";
  let file = "";
  let runDir = "";
  let genre = "essay";
  let diagnosis = "";

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--text") {
      text = argv[++i] ?? "";
    } else if (arg === "--file") {
      file = argv[++i] ?? "";
    } else if (arg === "--run-dir") {
      runDir = argv[++i] ?? "";
    } else if (arg === "--genre") {
      genre = argv[++i] ?? "essay";
    } else if (arg === "--diagnosis") {
      diagnosis = argv[++i] ?? "";
    }
  }

  return { text, file, runDir, genre, diagnosis };
}

function main(): number {
  const { text: rawText, file, runDir, genre, diagnosis } = parseCliArgs(process.argv.slice(2));

  let inputText = rawText;
  if (!inputText && file) {
    if (!existsSync(file)) {
      console.error(`error: 입력 파일 없음: ${file}`);
      return 1;
    }
    inputText = readFileSync(file, "utf-8");
  }

  if (!inputText && runDir) {
    const candidate = join(runDir, "01_input.txt");
    if (existsSync(candidate)) {
      inputText = readFileSync(candidate, "utf-8");
    }
  }

  if (!inputText) {
    console.error(
      "사용법: bun run scripts/prepare-humanize-input.ts (--text <텍스트> | --file <파일>) [--run-dir <디렉토리>] [--genre essay|column|report|blog] [--diagnosis <진단파일>]",
    );
    return 1;
  }

  const { cleaned, changed } = sanitizeText(inputText);
  if (changed) {
    console.log("text_sanitized: 비가시 문자/특수 공백/챗봇 프레임 정리 완료");
  }

  const metrics = analyzePatterns(cleaned, genre);

  let diagnosisText = "";
  if (diagnosis && existsSync(diagnosis)) {
    diagnosisText = `${readFileSync(diagnosis, "utf-8").trim()}\n\n---\n\n`;
  }

  const metricsBlock = [
    "<!-- METRICS-START",
    JSON.stringify(metrics, null, 2),
    "METRICS-END -->",
  ].join("\n");

  const combinedContent = `${diagnosisText}${metricsBlock}\n\n${cleaned}`;

  if (runDir) {
    mkdirSync(runDir, { recursive: true });
    writeFileSync(join(runDir, "00_metrics.json"), JSON.stringify(metrics, null, 2), "utf-8");
    writeFileSync(join(runDir, "01_input.txt"), cleaned, "utf-8");
    writeFileSync(join(runDir, "01_input_with_metrics.txt"), combinedContent, "utf-8");
    console.log(`run_dir: ${runDir}`);
  }

  console.log(`route_hint: ${metrics.routeHint}`);
  console.log(
    `stats: 글자수 ${metrics.totalChars}자, 단어수 ${metrics.totalWords}개, 문장수 ${metrics.totalSentences}개`,
  );
  console.log(`ai_tells_found: 총 ${metrics.totalPatternCount}건`);
  for (const match of metrics.patternMatches) {
    console.log(`  - [${match.id}] ${match.name}: ${match.count}회`);
  }

  return 0;
}

if (import.meta.main) {
  process.exit(main());
}
