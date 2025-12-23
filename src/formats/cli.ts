import type { McpServerConfig } from "../types.js";

/**
 * Claude Code CLI format
 */
export function buildClaudeCodeCli(config: McpServerConfig): string {
  if (config.type === "http") {
    let cmd = `claude mcp add --transport http ${config.name} ${config.url}`;
    if (config.headers) {
      for (const [key, value] of Object.entries(config.headers)) {
        cmd += ` --header "${key}: ${value}"`;
      }
    }
    return cmd;
  }

  const args = (config.args ?? []).map(escapeArg).join(" ");
  return `claude mcp add ${config.name} -- ${config.command} ${args}`.trim();
}

/**
 * Amp CLI format
 */
export function buildAmpCli(config: McpServerConfig): string {
  if (config.type === "http") {
    let cmd = `amp mcp add ${config.name} ${config.url}`;
    if (config.headers) {
      for (const [key, value] of Object.entries(config.headers)) {
        cmd += ` --header "${key}=${value}"`;
      }
    }
    return cmd;
  }

  const args = (config.args ?? []).join(" ");
  return `amp mcp add ${config.name} -- ${config.command} ${args}`.trim();
}

/**
 * Factory (Droid) CLI format
 */
export function buildFactoryCli(config: McpServerConfig): string {
  if (config.type === "http") {
    let cmd = `droid mcp add ${config.name} ${config.url} --type http`;
    if (config.headers) {
      for (const [key, value] of Object.entries(config.headers)) {
        cmd += ` --header "${key}: ${value}"`;
      }
    }
    return cmd;
  }

  const args = (config.args ?? []).join(" ");
  const fullCommand = `"${config.command} ${args}"`;
  let cmd = `droid mcp add ${config.name} ${fullCommand}`;
  if (config.env) {
    for (const [key, value] of Object.entries(config.env)) {
      cmd += ` --env ${key}=${value}`;
    }
  }
  return cmd;
}

/**
 * Rovo Dev CLI format
 */
export function buildRovoDevCli(config: McpServerConfig): string {
  const args = config.type === "stdio" ? (config.args ?? []).join(" ") : "";
  const command = config.type === "stdio" ? config.command : "npx";
  return `rovo mcp add ${config.name} -- ${command} ${args}`.trim();
}

function escapeArg(arg: string): string {
  if (arg.includes(" ") || arg.includes('"') || arg.includes("'")) {
    return `'${arg.replace(/'/g, "'\\''")}'`;
  }
  return arg;
}
