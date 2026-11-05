# Korean Writing Rules

Apply these rules when a document is written in Korean. They remove translation-ese and AI-tell patterns from technical documents. Follow them while drafting, then run the self-check before saving.

Adapted from `etc-lgnh` `humanize-korean` (a rewrite procedure for existing text). Change-rate gates and genre routing do not apply because a new document has no original to compare against.

## Preserve

- **Keep verbatim**: code identifiers, file paths, commands, product/library names, numbers, units, dates, and quoted output.
- **Keep standard technical terms in their original form** (API, prompt, token, pipeline, cache, commit). Never force a translation (`prompt` -> "지시문" is wrong).
- **Keep modality**: an obligation ("~해야 한다") stays an obligation, and a guess ("~일 수 있다") stays a guess. Do not turn either into a flat assertion to sound confident.
- **Keep one register**: follow the register of existing documents in the same directory. Otherwise use plain declarative "~다" throughout. Never mix "~다" and "~합니다" in one document.

## Write directly (S1: zero tolerance)

| ID   | Avoid                                                                         | Write instead                                                                             |
| :--- | :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| A-3  | "~에 있어(서)"                                                                | "~에서", "~할 때"                                                                         |
| A-7  | "가지고 있다", "~를 수행하다/진행하다" (have/perform + noun)                  | Verb or adjective: "캐시를 가지고 있다" -> "캐시가 있다", "검증을 수행한다" -> "검증한다" |
| A-8  | Double passive "~되어진다", "~지게 된다"                                      | Active or single passive: "생성되어진다" -> "생성된다"                                    |
| D-1  | Wrap-up openers "결론적으로", "요약하면", "정리하자면", "이를 통해"           | Delete. State the conclusion directly.                                                    |
| D-2  | Significance inflation "시사하는 바가 크다", "주목할 만하다", "매우 중요하다" | Delete, or state the concrete consequence.                                                |
| D-3  | List preambles "크게 세 가지로 나눌 수 있다", "다음과 같다"                   | Delete the preamble and start the list.                                                   |
| C-5  | Emoji in headings, bullets, or emphasis                                       | Delete all.                                                                               |
| C-11 | Comma after a connective ending ("-고,", "-며,", "-지만,", "-아서,")          | Remove the comma.                                                                         |
| I-1  | Three or more consecutive "~한 것이다"                                        | Plain "~다".                                                                              |
| J-2  | Quote marks used for emphasis                                                 | Use backticks for code, plain text otherwise. Quotes only for real quotations.            |

## Write plainly (S2: avoid repetition)

- **A-1, A-2, A-11**: "~에 대해", "~를 통해", "~을 위해" three or more times in one paragraph -> use direct particles ("X에 대해 설명" -> "X를 설명"), "~로", "~려고", "~도록".
- **A-5, A-6**: "~와 관련하여", "~에 기반하여" -> "~에", "~의", "~로".
- **A-9**: "X에 의해 Y된다" -> make the actor the subject: "`Scheduler`가 Y한다".
- **A-15**: Abstract subject + generic verb ("이 구조는 유연성을 제공한다") -> name the concrete actor and effect ("이 구조에서는 새 provider를 파일 하나로 추가한다").
- **A-19**: Stacked particles "~에서의", "~으로의", "~으로부터의" -> rewrite as a clause.
- **A-21**: "단순한 X를 넘어 Y" -> "X만이 아니라 Y다", or drop it.
- **A-22**: "~은 명확하다/분명하다" -> state the claim directly.
- **B-1**: Korean term + English in parentheses on every mention -> add the parentheses on the first mention only.
- **B-2**: Marketing buzzwords (seamless, robust, leverage, 강력한, 유연한) -> state the measurable property.
- **C-8**: "A가 아니라 B" contrast two or more times -> keep one and state the rest directly.
- **C-10**: Colon-subtitle headings "X: Y" -> a single noun phrase. Template headings stay as they are.
- **D-4**: Hype words (혁신적, 획기적, 압도적) -> a number or a concrete fact.
- **D-8**: Cleft "핵심은/문제는/중요한 것은 ~이다" -> subject-predicate: "핵심은 캐시 무효화다" -> "캐시 무효화가 병목이다".
- **D-9, D-10**: "~로 이어진다", "결국", "~하는 이유다" as wrap-up -> write the causal path concretely. At most once per document.
- **D-12**: Standalone "한계도 있다", "과제도 남아 있다" -> drop the label and write the actual limit.
- **E-2**: The same sentence ending four or more times in a row, or automatic "~고 있다" -> vary endings and use simple tense ("처리하고 있다" -> "처리한다").
- **F-4, F-5**: Piled "-성/-적/-화" nouns, "~적 N" chains -> use the verb or adjective root ("확장성 확보" -> "확장하기 쉽게 만든다").
- **F-7**: Generic policy verbs (강화, 개선, 확보, 마련, 구축) -> the concrete action ("검증 강화" -> "입력 길이를 검사한다").
- **G-1, G-2**: Repeated or stacked hedges "~로 보인다", "~할 가능성이 있을 수 있다" -> keep one hedge with the same strength. Mark unverified claims as inference instead of hedging every sentence.
- **H-1, H-4**: Sentence-initial "또한", "따라서", "즉", "나아가" three or more times in one paragraph -> remove about half.
- **I-2, I-3**: "주목할 점은 ~라는 점이다", "~다는 것이다" -> "X는 ~다".
- **J-3**: An em dash (—) for asides in every sentence -> use a comma, parentheses, or a separate sentence.

## Format in technical documents

- **Bullets vs. prose**: Keep the bullet structure the category template requires. Write reasoning (Context, Key Decisions & Tradeoffs, Rationale, freeform story sections) as short prose paragraphs, not chains of three or more fragment bullets.
- **Code over description**: When a path, command, or snippet says it, show it instead of describing it.

## Self-check before saving

Scan the finished document and fix every violation. Repeat the scan at most once.

1. Identifiers, paths, commands, numbers, and technical terms are unchanged and untranslated.
2. Obligations and guesses keep their original modality.
3. One register throughout the document.
4. Zero S1 patterns remain (A-3, A-7, A-8, C-5, C-11, D-1, D-2, D-3, I-1, J-2).
5. No S2 pattern repeats past its threshold above.
6. No new metaphors, slogans, or claims were added to sound natural. Content comes only from the session evidence.
