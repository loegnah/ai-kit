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
}

const SELF_DIR_NAMES: Record<string, true> = {
  "import-external-skills": true,
  "update-external-skills": true,
};

function printUsage(): void {
  console.log(`
Usage: bun run .agents/skills/import-external-skills/scripts/relocate.ts <source> [options]

Arguments:
  <source>               Skill package / Git repository URL (e.g. https://github.com/obra/superpowers or obra/superpowers)

Options:
  -t, --target <path>    Explicit target directory path (e.g. skills/etc-lgnh/catalog/superpowers)
  -r, --runner <runner>  Target runner name (e.g. etc-lgnh, dev-lgnh)
  -n, --name <name>      Catalog name under runner (e.g. superpowers)
  -s, --skill <names>    Specific skill name(s) to install/move (comma-separated)
  --move-only            Skip 'npx skills add' and only relocate existing skills from .agents/skills
  --dry-run              Preview actions without executing filesystem changes
  -h, --help             Show this help message

Examples:
  bun run .agents/skills/import-external-skills/scripts/relocate.ts https://github.com/obra/superpowers --runner etc-lgnh --name superpowers
  bun run .agents/skills/import-external-skills/scripts/relocate.ts obra/superpowers -t skills/etc-lgnh/catalog/superpowers
  bun run .agents/skills/import-external-skills/scripts/relocate.ts obra/superpowers -s brainstorming -r etc-lgnh -n superpowers
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
  }

  console.log("\n==================== IMPORT SUMMARY ====================");
  for (const item of movedSummary) {
    console.log(`- ${item.skill}:`);
    console.log(`    Path: ${item.to}`);
    console.log(`    Lock: skillPath -> "${item.skillPath}"`);
  }
  console.log("========================================================\n");
}

if (import.meta.main) {
  const options = parseArgs(process.argv.slice(2));
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
