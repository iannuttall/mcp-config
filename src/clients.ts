import type { McpClient } from "./types.js";

/**
 * All supported MCP clients
 */
export const clients: McpClient[] = [
  // JSON format clients
  {
    slug: "claude-desktop",
    name: "Claude Desktop",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: "https://modelcontextprotocol.io/quickstart/user",
  },
  {
    slug: "cursor",
    name: "Cursor",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: "https://docs.cursor.com/context/model-context-protocol",
  },
  {
    slug: "windsurf",
    name: "Windsurf",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: "https://docs.windsurf.com/windsurf/mcp",
  },
  {
    slug: "vs-code",
    name: "VS Code",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: "https://code.visualstudio.com/docs/copilot/chat/mcp-servers",
  },
  {
    slug: "cline",
    name: "Cline",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: "https://docs.cline.bot/mcp-servers/configuring-mcp-servers",
  },
  {
    slug: "zed",
    name: "Zed",
    format: "json",
    supportsRemote: false,
    supportsLocal: true,
    docsUrl: "https://zed.dev/docs/assistant/context-servers",
  },
  {
    slug: "jetbrains",
    name: "JetBrains IDEs",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "amazon-q",
    name: "Amazon Q",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "lm-studio",
    name: "LM Studio",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "kilo-code",
    name: "Kilo Code",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "roo-code",
    name: "Roo Code",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "gemini-cli",
    name: "Gemini CLI",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "qwen-coder",
    name: "Qwen Coder",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "augment-code",
    name: "Augment Code",
    format: "json",
    supportsRemote: false,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "opencode",
    name: "OpenCode",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "visual-studio",
    name: "Visual Studio",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "warp",
    name: "Warp",
    format: "json",
    supportsRemote: false,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "perplexity-desktop",
    name: "Perplexity Desktop",
    format: "json",
    supportsRemote: false,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "copilot-coding-agent",
    name: "Copilot Coding Agent",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "copilot-cli",
    name: "Copilot CLI",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "google-antigravity",
    name: "Google Antigravity",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "kiro",
    name: "Kiro",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "trae",
    name: "Trae",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "boltai",
    name: "BoltAI",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "crush",
    name: "Crush",
    format: "json",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },

  // CLI format clients
  {
    slug: "claude-code",
    name: "Claude Code",
    format: "cli",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: "https://docs.anthropic.com/en/docs/claude-code/mcp",
  },
  {
    slug: "amp",
    name: "Amp",
    format: "cli",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "factory",
    name: "Factory (Droid)",
    format: "cli",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
  {
    slug: "rovo-dev",
    name: "Rovo Dev",
    format: "cli",
    supportsRemote: false,
    supportsLocal: true,
    docsUrl: null,
  },

  // TOML format clients
  {
    slug: "openai-codex",
    name: "OpenAI Codex CLI",
    format: "toml",
    supportsRemote: true,
    supportsLocal: true,
    docsUrl: null,
  },
];

/**
 * Get all supported clients
 */
export function getClients(): McpClient[] {
  return clients;
}

/**
 * Get a client by slug
 */
export function getClient(slug: string): McpClient | undefined {
  return clients.find((c) => c.slug === slug);
}

/**
 * Get clients that support a specific transport type
 */
export function getClientsByTransport(
  transport: "remote" | "local"
): McpClient[] {
  return clients.filter((c) =>
    transport === "remote" ? c.supportsRemote : c.supportsLocal
  );
}
