import { getClient } from "./clients.js";
import type {
  McpServerConfig,
  TransformOptions,
  TransformResult,
} from "./types.js";
import {
  buildStandardJson,
  buildVsCodeJson,
  buildServerUrlJson,
  buildStreamableHttpJson,
  buildHttpUrlJson,
  buildZedJson,
  buildAugmentJson,
  buildOpencodeJson,
  buildVisualStudioJson,
  buildWarpJson,
  buildPerplexityJson,
} from "./formats/json.js";
import {
  buildClaudeCodeCli,
  buildAmpCli,
  buildFactoryCli,
  buildRovoDevCli,
} from "./formats/cli.js";
import { buildCodexToml } from "./formats/toml.js";

/**
 * Transform an MCP server config for a specific client
 */
export function transformConfig(options: TransformOptions): TransformResult {
  const { server, client: clientSlug } = options;

  const client = getClient(clientSlug);
  if (!client) {
    throw new Error(`Unknown client: ${clientSlug}`);
  }

  // Check transport compatibility
  if (server.type === "http" && !client.supportsRemote) {
    throw new Error(`Client ${client.name} does not support remote (HTTP) servers`);
  }
  if (server.type === "stdio" && !client.supportsLocal) {
    throw new Error(`Client ${client.name} does not support local (stdio) servers`);
  }

  const config = buildConfig(server, clientSlug);

  return {
    config,
    format: client.format,
    client,
  };
}

function buildConfig(server: McpServerConfig, clientSlug: string): string {
  // JSON format clients
  switch (clientSlug) {
    // Standard JSON format
    case "claude-desktop":
    case "cursor":
    case "jetbrains":
    case "kiro":
    case "amazon-q":
    case "lm-studio":
    case "trae":
    case "boltai":
    case "crush":
      return buildStandardJson(server);

    // VS Code format
    case "vs-code":
    case "copilot-coding-agent":
    case "copilot-cli":
      return buildVsCodeJson(server);

    // serverUrl format
    case "windsurf":
    case "google-antigravity":
      return buildServerUrlJson(server);

    // streamable-http format
    case "cline":
    case "kilo-code":
    case "roo-code":
      return buildStreamableHttpJson(server);

    // httpUrl format
    case "gemini-cli":
    case "qwen-coder":
      return buildHttpUrlJson(server);

    // Custom JSON formats
    case "zed":
      return buildZedJson(server);
    case "augment-code":
      return buildAugmentJson(server);
    case "opencode":
      return buildOpencodeJson(server);
    case "visual-studio":
      return buildVisualStudioJson(server);
    case "warp":
      return buildWarpJson(server);
    case "perplexity-desktop":
      return buildPerplexityJson(server);

    // CLI format clients
    case "claude-code":
      return buildClaudeCodeCli(server);
    case "amp":
      return buildAmpCli(server);
    case "factory":
      return buildFactoryCli(server);
    case "rovo-dev":
      return buildRovoDevCli(server);

    // TOML format clients
    case "openai-codex":
      return buildCodexToml(server);

    default:
      return buildStandardJson(server);
  }
}
