import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

interface SkillsLockEntry {
  source: string;
  sourceType: string;
  skillPath: string;
  computedHash: string;
}

interface SkillsLock {
  version: number;
  skills: Record<string, SkillsLockEntry>;
}

interface CliOptions {
  source?: string;
  target?: string;
  runner?: string;
  name?: string;
  skills: string[];
  moveOnly: boolean;
  dryRun: boolean;
  updateAll?: boolean;
  update?: string;
  entrypoint?: string;
  reindex?: boolean;
}

const SELF_DIR_NAMES: Record<string, true> = {
  "import-external-skills": true,
  "update-external-skills": true,
};

function printUsage(): void {
  console.log(`
Usage: bun run .agents/skills/import-external-skills/scripts/relocate.ts <source> [options]
       bun run .agents/skills/import-external-skills/scripts/relocate.ts --update-all [options]

Arguments:
  <source>               Skill package / Git repository URL (e.g. https://github.com/obra/superpowers or obra/superpowers)

Options:
  -u, --update [filter]  Update registered skills from skills-lock.json matching optional filter
  --update-all           Update all registered skills from skills-lock.json
  -t, --target <path>    Explicit target directory path (e.g. skills/etc-lgnh/catalog/superpowers)
  -r, --runner <runner>  Target runner name (e.g. etc-lgnh, dev-lgnh)
  -n, --name <name>      Catalog name under runner (e.g. superpowers)
  -s, --skill <names>    Specific skill name(s) to install/move (comma-separated)
  --move-only            Skip 'npx skills add' and only relocate existing skills from .agents/skills
  --dry-run              Preview actions without executing filesystem changes
  -e, --entrypoint <name> Primary entrypoint skill name for catalog index
  --reindex              Regenerate INDEX.md for all or specified catalogs
  -h, --help             Show this help message
Examples:
  bun run .agents/skills/import-external-skills/scripts/relocate.ts https://github.com/obra/superpowers --runner etc-lgnh --name superpowers
  bun run .agents/skills/import-external-skills/scripts/relocate.ts --update-all
  bun run .agents/skills/import-external-skills/scripts/relocate.ts -u superpowers
  bun run .agents/skills/import-external-skills/scripts/relocate.ts obra/superpowers -t skills/etc-lgnh/catalog/superpowers
`);
}

export function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    skills: [],
    moveOnly: false,
    dryRun: false,
  };

  const positional: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    if (arg === "-h" || arg === "--help") {
      printUsage();
      process.exit(0);
    } else if (arg === "--move-only") {
      options.moveOnly = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--reindex") {
      options.reindex = true;
    } else if (arg === "-e" || arg === "--entrypoint") {
      options.entrypoint = args[++i];
    } else if (arg.startsWith("--entrypoint=")) {
      options.entrypoint = arg.slice(13);
    } else if (arg === "--update-all") {
      options.updateAll = true;
    } else if (arg === "-u" || arg === "--update") {
      const next = args[i + 1];
      if (next && !next.startsWith("-")) {
        options.update = args[++i];
      } else {
        options.updateAll = true;
      }
    } else if (arg.startsWith("--update=")) {
      options.update = arg.slice(9);
    } else if (arg === "-t" || arg === "--target") {
      options.target = args[++i];
    } else if (arg === "-r" || arg === "--runner") {
      options.runner = args[++i];
    } else if (arg === "-n" || arg === "--name") {
      options.name = args[++i];
    } else if (arg === "-s" || arg === "--skill") {
      const val = args[++i];
      if (val) {
        options.skills.push(
          ...val
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        );
      }
    } else if (arg.startsWith("--target=")) {
      options.target = arg.slice(9);
    } else if (arg.startsWith("--runner=")) {
      options.runner = arg.slice(9);
    } else if (arg.startsWith("--name=")) {
      options.name = arg.slice(7);
    } else if (arg.startsWith("--skill=")) {
      options.skills.push(
        ...arg
          .slice(8)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      );
    } else if (!arg.startsWith("-")) {
      positional.push(arg);
    }
  }

  if (positional.length > 0 && !options.source) {
    options.source = positional[0];
  }
  if (positional.length > 1 && !options.target) {
    options.target = positional[1];
  }

  return options;
}

export function resolveTargetPath(repoRoot: string, options: CliOptions): string {
  let targetRel = "";

  if (options.runner) {
    const runner = options.runner.replace(/^skills\//, "").replace(/\/$/, "");
    if (options.name) {
      targetRel = path.join("skills", runner, "catalog", options.name);
    } else {
      targetRel = path.join("skills", runner, "catalog");
    }
  } else if (options.target) {
    targetRel = options.target.replace(/^\.\//, "");
    if (!targetRel.startsWith("skills/")) {
      const parts = targetRel.split("/").filter(Boolean);
      if (parts[0] && parts[0].endsWith("-lgnh")) {
        if (parts[1] === "catalog") {
          targetRel = path.join("skills", ...parts);
        } else {
          targetRel = path.join("skills", parts[0], "catalog", ...parts.slice(1));
        }
      } else {
        targetRel = path.join("skills", targetRel);
      }
    }
  } else {
    throw new Error(
      "Target directory not specified. Use --target <path> or --runner <runner> [--name <name>].",
    );
  }

  const resolved = path.resolve(repoRoot, targetRel);
  const allowedBase = path.resolve(repoRoot, "skills");
  if (!resolved.startsWith(allowedBase)) {
    throw new Error(`Target path '${resolved}' must be inside '${allowedBase}'`);
  }

  return resolved;
}

export function cleanupRogueSymlinks(repoRoot: string): void {
  const skillsDir = path.join(repoRoot, "skills");
  if (!fs.existsSync(skillsDir)) return;
  for (const entry of fs.readdirSync(skillsDir, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) {
      const p = path.join(skillsDir, entry.name);
      try {
        fs.unlinkSync(p);
        console.log(`[import-external-skills] Cleaned up rogue symlink: skills/${entry.name}`);
      } catch {}
    }
  }
}

function findSkillMd(dir: string): string | null {
  const directPath = path.join(dir, "SKILL.md");
  if (fs.existsSync(directPath)) {
    return directPath;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const sub = findSkillMd(path.join(dir, entry.name));
      if (sub) return sub;
    }
  }
  return null;
}
export interface CatalogSkillSummary {
  name: string;
  description: string;
  runnerRelPath: string;
  repoRelPath: string;
}

export function simplifyDescription(raw: string): string {
  if (!raw) return "No description available.";
  let clean = raw
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const firstSentenceMatch = clean.match(/^([^.!?]+[.!?])/);
  const firstSentence = firstSentenceMatch?.[1];
  if (firstSentence && firstSentence.length <= 140) {
    clean = firstSentence;
  } else if (clean.length > 120) {
    clean = `${clean.slice(0, 117).trim()}...`;
  }

  return clean;
}

export function extractSkillMetadata(skillMdPath: string): { name: string; description: string } {
  const content = fs.readFileSync(skillMdPath, "utf-8");
  const dirName = path.basename(path.dirname(skillMdPath));
  let name = dirName;
  let description = "";

  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (frontmatterMatch && frontmatterMatch[1]) {
    const yaml = frontmatterMatch[1];
    const nameMatch = yaml.match(/^name:\s*(.+)$/m);
    const matchedName = nameMatch?.[1];
    if (matchedName) {
      name = matchedName.trim().replace(/^['"]|['"]$/g, "");
    }

    const descMatch = yaml.match(
      /^description:\s*(?:[>|][-+]?\r?\n)?([\s\S]*?)(?=\r?\n[a-zA-Z0-9_-]+:|$)/m,
    );
    const matchedDesc = descMatch?.[1];
    if (matchedDesc) {
      description = matchedDesc
        .replace(/\r?\n\s*/g, " ")
        .trim()
        .replace(/^['"]|['"]$/g, "")
        .replace(/\\"/g, '"')
        .replace(/''/g, "'");
    }
  }

  if (!description) {
    const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---/, "");
    const lines = body
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#") && !l.startsWith("<"));
    if (lines.length > 0) {
      description = lines[0] ?? "";
    }
  }

  description = simplifyDescription(description);

  return { name, description };
}

export function detectPrimaryEntrypoint(
  catalogName: string,
  skills: CatalogSkillSummary[],
  override?: string,
): CatalogSkillSummary | null {
  if (skills.length === 0) return null;
  if (override) {
    const found = skills.find((s) => s.name.toLowerCase() === override.toLowerCase());
    if (found) return found;
  }

  const lowerCat = catalogName.toLowerCase();

  const usingExact = skills.find((s) => s.name.toLowerCase() === `using-${lowerCat}`);
  if (usingExact) return usingExact;

  const usingPrefix = skills.find((s) => s.name.toLowerCase().startsWith("using-"));
  if (usingPrefix) return usingPrefix;

  const askSkill = skills.find(
    (s) => s.name.toLowerCase().startsWith("ask-") || s.name.toLowerCase().includes("router"),
  );
  if (askSkill) return askSkill;

  const exact = skills.find((s) => s.name.toLowerCase() === lowerCat);
  if (exact) return exact;

  const guide = skills.find((s) =>
    ["overview", "main", "guide", "workflow"].includes(s.name.toLowerCase()),
  );
  if (guide) return guide;

  return skills[0] ?? null;
}

export function generateCatalogIndex(
  catalogDir: string,
  repoRoot: string = process.cwd(),
  catalogName?: string,
  primaryOverride?: string,
): string | null {
  if (!fs.existsSync(catalogDir)) return null;

  const actualCatalogName = catalogName || path.basename(catalogDir);
  const runnerDir = path.resolve(catalogDir, "../..");

  const entries = fs
    .readdirSync(catalogDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  const skills: CatalogSkillSummary[] = [];

  for (const entryName of entries) {
    const subDir = path.join(catalogDir, entryName);
    const skillMd = findSkillMd(subDir);
    if (!skillMd) continue;

    const { name, description } = extractSkillMetadata(skillMd);
    const runnerRelPath = path.relative(runnerDir, skillMd);
    const repoRelPath = path.relative(repoRoot, skillMd);

    skills.push({
      name: name || entryName,
      description,
      runnerRelPath,
      repoRelPath,
    });
  }

  if (skills.length === 0) return null;

  skills.sort((a, b) => a.name.localeCompare(b.name));

  const primary = detectPrimaryEntrypoint(actualCatalogName, skills, primaryOverride);

  const title = actualCatalogName.charAt(0).toUpperCase() + actualCatalogName.slice(1);

  const rows = skills
    .map(
      (s) => `| \`${s.name}\` | ${s.description.replace(/\|/g, "\\|")} | \`${s.runnerRelPath}\` |`,
    )
    .join("\n");

  const primaryBlock = primary
    ? `## Primary Entrypoint\n\n- **Default Workflow**: \`${primary.name}\`\n- **Path**: \`${primary.runnerRelPath}\`\n- **Instruction**: When invoking this catalog without a specific sub-task keyword, start by reading and executing this primary workflow.`
    : "";

  const content = `# ${title} Skill Catalog

Curated external skills catalog for \`${actualCatalogName}\`.

${primaryBlock}

## Available Skills (${skills.length})

| Skill | Description | Path |
| :--- | :--- | :--- |
${rows}

## Execution & Composition Guidelines

1. **Orientation**: Read this index first to become aware of all available skills in this catalog.
2. **Primary Flow**: Follow the primary workflow (\`${primary?.runnerRelPath ?? "N/A"}\`) as the default approach.
3. **Proactive Composition**: While executing the primary workflow or when specific tasks arise (e.g. testing, debugging, reviewing, planning), proactively read and utilize the relevant sub-skills from the table above.
`;

  const indexPath = path.join(catalogDir, "INDEX.md");
  fs.writeFileSync(indexPath, content, "utf-8");
  console.log(
    `[import-external-skills] Generated catalog index: ${path.relative(repoRoot, indexPath)} (${skills.length} skills, primary: ${primary?.name ?? "none"})`,
  );

  return indexPath;
}

export function reindexAllCatalogs(repoRoot: string = process.cwd(), runnerFilter?: string): void {
  const skillsDir = path.join(repoRoot, "skills");
  if (!fs.existsSync(skillsDir)) return;

  const runnerDirs = fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter(
      (d) =>
        d.isDirectory() &&
        (!runnerFilter || d.name === runnerFilter || d.name === `${runnerFilter}-lgnh`),
    );

  for (const rDir of runnerDirs) {
    const catalogDir = path.join(skillsDir, rDir.name, "catalog");
    if (!fs.existsSync(catalogDir)) continue;

    const subCatalogs = fs
      .readdirSync(catalogDir, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    for (const cat of subCatalogs) {
      const fullCatDir = path.join(catalogDir, cat.name);
      generateCatalogIndex(fullCatDir, repoRoot, cat.name);
    }
  }
}

export function importAndRelocate(options: CliOptions, repoRoot: string = process.cwd()): void {
  const targetDir = resolveTargetPath(repoRoot, options);
  const targetRel = path.relative(repoRoot, targetDir);

  console.log(`[import-external-skills] Target directory: ${targetRel}`);

  if (!options.moveOnly && options.source) {
    console.log(`[import-external-skills] Installing skills from '${options.source}'...`);
    if (!options.dryRun) {
      const cmdArgs = ["--yes", "skills", "add", options.source, "-y", "--copy"];
      if (options.skills.length > 0) {
        cmdArgs.push("-s", options.skills.join(","));
      } else {
        cmdArgs.push("--skill", "*");
      }
      console.log(`> npx ${cmdArgs.join(" ")}`);
      const result = spawnSync("npx", cmdArgs, {
        cwd: repoRoot,
        stdio: "inherit",
        env: process.env,
      });
      if (result.status !== 0) {
        throw new Error(`'npx skills add' failed with exit code ${result.status}`);
      }
      cleanupRogueSymlinks(repoRoot);
    } else {
      console.log(`[dry-run] Would execute: npx --yes skills add ${options.source} -y --copy`);
    }
  }

  const agentsSkillsDir = path.join(repoRoot, ".agents", "skills");
  if (!fs.existsSync(agentsSkillsDir)) {
    console.warn(
      `[import-external-skills] No '.agents/skills' directory found at ${agentsSkillsDir}.`,
    );
    return;
  }

  const lockPath = path.join(repoRoot, "skills-lock.json");
  let lockData: SkillsLock = { version: 1, skills: {} };
  if (fs.existsSync(lockPath)) {
    try {
      lockData = JSON.parse(fs.readFileSync(lockPath, "utf-8")) as SkillsLock;
    } catch {
      console.warn(
        `[import-external-skills] Could not parse ${lockPath}, creating fresh lock structure.`,
      );
    }
  }

  const availableDirs = fs
    .readdirSync(agentsSkillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !SELF_DIR_NAMES[d.name])
    .map((d) => d.name);

  if (availableDirs.length === 0) {
    console.log("[import-external-skills] No external skills found in '.agents/skills' to move.");
    return;
  }

  let skillsToMove: string[] = [];
  if (options.skills.length > 0) {
    skillsToMove = availableDirs.filter((d) => options.skills.includes(d));
  } else if (options.source) {
    const normSource = options.source
      .replace(/^https?:\/\/github\.com\//, "")
      .replace(/\.git$/, "");
    const matchingFromLock = Object.entries(lockData.skills)
      .filter(
        ([_, entry]) => entry.source.includes(normSource) || normSource.includes(entry.source),
      )
      .map(([name]) => name);

    if (matchingFromLock.length > 0) {
      skillsToMove = availableDirs.filter((d) => matchingFromLock.includes(d));
    }
  }

  if (skillsToMove.length === 0) {
    skillsToMove = availableDirs;
  }

  console.log(
    `[import-external-skills] Skills to relocate (${skillsToMove.length}): ${skillsToMove.join(", ")}`,
  );

  const movedSummary: Array<{ skill: string; from: string; to: string; skillPath: string }> = [];

  for (const skillName of skillsToMove) {
    const srcDir = path.join(agentsSkillsDir, skillName);
    if (!fs.existsSync(srcDir)) continue;

    let destDir: string;
    if (skillsToMove.length === 1 && path.basename(targetDir) === skillName) {
      destDir = targetDir;
    } else {
      destDir = path.join(targetDir, skillName);
    }

    const relSrc = path.relative(repoRoot, srcDir);
    const relDest = path.relative(repoRoot, destDir);

    console.log(`[import-external-skills] Moving: ${relSrc} -> ${relDest}`);

    if (!options.dryRun) {
      if (fs.existsSync(destDir)) {
        fs.rmSync(destDir, { recursive: true, force: true });
      }
      fs.mkdirSync(path.dirname(destDir), { recursive: true });
      fs.cpSync(srcDir, destDir, { recursive: true });
      fs.rmSync(srcDir, { recursive: true, force: true });

      const skillMd = findSkillMd(destDir);
      let updatedSkillPath = relDest;
      if (skillMd) {
        updatedSkillPath = path.relative(repoRoot, skillMd);
      } else {
        updatedSkillPath = path.join(relDest, "SKILL.md");
      }

      if (lockData.skills[skillName]) {
        lockData.skills[skillName].skillPath = updatedSkillPath;
      } else {
        lockData.skills[skillName] = {
          source: options.source ?? "local",
          sourceType: "github",
          skillPath: updatedSkillPath,
          computedHash: "",
        };
      }

      movedSummary.push({
        skill: skillName,
        from: relSrc,
        to: relDest,
        skillPath: updatedSkillPath,
      });
    } else {
      movedSummary.push({
        skill: skillName,
        from: relSrc,
        to: relDest,
        skillPath: path.join(relDest, "SKILL.md"),
      });
    }
  }

  if (!options.dryRun) {
    fs.writeFileSync(lockPath, JSON.stringify(lockData, null, 2) + "\n", "utf-8");
    console.log(`[import-external-skills] Updated ${path.relative(repoRoot, lockPath)}`);
    generateCatalogIndex(targetDir, repoRoot, options.name, options.entrypoint);
  }

  console.log("\n==================== IMPORT SUMMARY ====================");
  for (const item of movedSummary) {
    console.log(`- ${item.skill}:`);
    console.log(`    Path: ${item.to}`);
    console.log(`    Lock: skillPath -> "${item.skillPath}"`);
  }
  console.log("========================================================\n");
}

export function updateLockedSkills(options: CliOptions, repoRoot: string = process.cwd()): void {
  const lockPath = path.join(repoRoot, "skills-lock.json");
  if (!fs.existsSync(lockPath)) {
    throw new Error(`skills-lock.json not found at ${lockPath}`);
  }

  let lockData: SkillsLock;
  try {
    lockData = JSON.parse(fs.readFileSync(lockPath, "utf-8")) as SkillsLock;
  } catch (e) {
    throw new Error(`Failed to parse ${lockPath}: ${(e as Error).message}`);
  }

  const entries = Object.entries(lockData.skills);
  if (entries.length === 0) {
    console.log("[import-external-skills] No skills registered in skills-lock.json to update.");
    return;
  }

  const filter = options.update?.toLowerCase();
  const targetEntries = filter
    ? entries.filter(
        ([name, entry]) =>
          name.toLowerCase().includes(filter) ||
          entry.source.toLowerCase().includes(filter) ||
          entry.skillPath.toLowerCase().includes(filter),
      )
    : entries;

  if (targetEntries.length === 0) {
    console.log(`[import-external-skills] No skills matched filter: '${options.update}'`);
    return;
  }

  console.log(
    `[import-external-skills] Found ${targetEntries.length} skill(s) to update${filter ? ` matching '${filter}'` : ""}:`,
  );
  for (const [name, entry] of targetEntries) {
    console.log(`  - ${name} (${entry.source} -> ${entry.skillPath})`);
  }

  const bySource = new Map<string, Array<{ name: string; entry: SkillsLockEntry }>>();
  for (const [name, entry] of targetEntries) {
    const list = bySource.get(entry.source) ?? [];
    list.push({ name, entry });
    bySource.set(entry.source, list);
  }

  const originalPaths: Record<string, string> = {};
  for (const [name, entry] of targetEntries) {
    originalPaths[name] = entry.skillPath;
  }

  for (const [source, items] of bySource) {
    const skillNames = items.map((i) => i.name);
    console.log(`\n[import-external-skills] Fetching updates from '${source}'...`);

    if (!options.dryRun) {
      const cmdArgs = [
        "--yes",
        "skills",
        "add",
        source,
        "-y",
        "--copy",
        "-s",
        skillNames.join(","),
      ];
      console.log(`> npx ${cmdArgs.join(" ")}`);
      const result = spawnSync("npx", cmdArgs, {
        cwd: repoRoot,
        stdio: "inherit",
        env: process.env,
      });
      if (result.status !== 0) {
        console.error(
          `[import-external-skills] Warning: 'npx skills add' failed for '${source}' (exit code ${result.status})`,
        );
        continue;
      }

      cleanupRogueSymlinks(repoRoot);

      for (const { name, entry } of items) {
        const srcDir = path.join(repoRoot, ".agents", "skills", name);
        if (!fs.existsSync(srcDir)) continue;

        const targetSkillMd = path.resolve(repoRoot, entry.skillPath);
        const destDir = path.dirname(targetSkillMd);

        console.log(
          `[import-external-skills] Relocating updated: .agents/skills/${name} -> ${path.relative(repoRoot, destDir)}`,
        );
        if (fs.existsSync(destDir)) {
          fs.rmSync(destDir, { recursive: true, force: true });
        }
        fs.mkdirSync(destDir, { recursive: true });
        fs.cpSync(srcDir, destDir, { recursive: true });
        fs.rmSync(srcDir, { recursive: true, force: true });
      }
    } else {
      console.log(`[dry-run] Would update ${items.length} skills from ${source}`);
    }
  }

  if (!options.dryRun) {
    if (fs.existsSync(lockPath)) {
      try {
        const freshLock = JSON.parse(fs.readFileSync(lockPath, "utf-8")) as SkillsLock;
        for (const [name, originalPath] of Object.entries(originalPaths)) {
          if (freshLock.skills[name]) {
            freshLock.skills[name].skillPath = originalPath;
          }
        }
        lockData = freshLock;
      } catch {}
    }
    fs.writeFileSync(lockPath, JSON.stringify(lockData, null, 2) + "\n", "utf-8");
    console.log(`[import-external-skills] Updated ${path.relative(repoRoot, lockPath)}`);
    const affectedCatalogDirs = new Set<string>();
    for (const [, entry] of targetEntries) {
      const skillPath = path.resolve(repoRoot, entry.skillPath);
      const catDir = path.dirname(path.dirname(skillPath));
      if (fs.existsSync(catDir)) {
        affectedCatalogDirs.add(catDir);
      }
    }
    for (const catDir of affectedCatalogDirs) {
      generateCatalogIndex(catDir, repoRoot);
    }
  }

  console.log("\n==================== UPDATE COMPLETE ====================\n");
}

if (import.meta.main) {
  const options = parseArgs(process.argv.slice(2));
  if (options.reindex) {
    try {
      reindexAllCatalogs(process.cwd(), options.runner);
    } catch (err: unknown) {
      console.error(`[error] ${(err as Error).message}`);
      process.exit(1);
    }
  } else if (options.updateAll || options.update) {
    try {
      updateLockedSkills(options);
    } catch (err: unknown) {
      console.error(`[error] ${(err as Error).message}`);
      process.exit(1);
    }
  } else {
    if (!options.source && !options.moveOnly) {
      printUsage();
      process.exit(1);
    }
    try {
      importAndRelocate(options);
    } catch (err: unknown) {
      console.error(`[error] ${(err as Error).message}`);
      process.exit(1);
    }
  }
}
