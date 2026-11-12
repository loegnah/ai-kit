import { homedir } from "node:os";
import { basename, join } from "node:path";

import { $ } from "bun";

import plugin from "../.claude-plugin/plugin.json";

const repoRoot = join(import.meta.dir, "..");
const installedSkillsDir = join(homedir(), ".agents/skills");
const claudeAgentsDir = join(homedir(), ".claude/agents");
const claudeAgentTemplatesDir = join(repoRoot, "skills/loegg/action/setup/agents/claude");

for (const skillPath of plugin.skills) {
  const skillName = basename(skillPath);
  const source = join(repoRoot, skillPath);
  const target = join(installedSkillsDir, skillName);
  await $`rsync -a --delete --exclude .claude --exclude .DS_Store ${source}/ ${target}/`;
  console.log(`skill  ${skillName} -> ${target}`);
}

await $`mkdir -p ${claudeAgentsDir}`;
for (const templateName of await Array.fromAsync(
  new Bun.Glob("*.md").scan(claudeAgentTemplatesDir),
)) {
  await $`cp ${join(claudeAgentTemplatesDir, templateName)} ${claudeAgentsDir}/`;
  console.log(`agent  ${templateName} -> ${claudeAgentsDir}`);
}
