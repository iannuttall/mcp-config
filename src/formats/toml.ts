import type { McpServerConfig } from "../types.js";

/**
 * OpenAI Codex TOML format
 */
export function buildCodexToml(config: McpServerConfig): string {
  const lines: string[] = [`[mcp_servers.${config.name}]`];

  if (config.type === "http") {
    lines.push(`url = "${config.url}"`);
    if (config.headers && Object.keys(config.headers).length > 0) {
      const headerPairs = Object.entries(config.headers)
        .map(([k, v]) => `"${k}" = "${v}"`)
        .join(", ");
      lines.push(`http_headers = { ${headerPairs} }`);
    }
  } else {
    lines.push(`command = "${config.command}"`);
    const args = (config.args ?? []).map((a) => `"${a}"`).join(", ");
    lines.push(`args = [${args}]`);
    lines.push("startup_timeout_ms = 20_000");
  }

  return lines.join("\n");
}
