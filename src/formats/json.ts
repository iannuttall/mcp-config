import type { McpServerConfig } from "../types.js";

/**
 * Build server config object for JSON output
 */
function buildServerConfigObject(
  config: McpServerConfig
): Record<string, unknown> {
  if (config.type === "http") {
    const obj: Record<string, unknown> = { url: config.url };
    if (config.headers && Object.keys(config.headers).length > 0) {
      obj.headers = config.headers;
    }
    return obj;
  }

  const obj: Record<string, unknown> = {
    command: config.command,
    args: config.args ?? [],
  };
  if (config.env && Object.keys(config.env).length > 0) {
    obj.env = config.env;
  }
  return obj;
}

/**
 * Standard JSON format (Claude Desktop, Cursor, JetBrains, etc.)
 */
export function buildStandardJson(config: McpServerConfig): string {
  const serverConfig = buildServerConfigObject(config);
  const output = {
    mcpServers: {
      [config.name]: serverConfig,
    },
  };
  return JSON.stringify(output, null, 2);
}

/**
 * VS Code format (mcp.servers)
 */
export function buildVsCodeJson(config: McpServerConfig): string {
  const serverConfig = buildServerConfigObject(config);
  const typedConfig = {
    type: config.type === "http" ? "http" : "stdio",
    ...serverConfig,
  };
  const output = {
    mcp: {
      servers: {
        [config.name]: typedConfig,
      },
    },
  };
  return JSON.stringify(output, null, 2);
}

/**
 * Windsurf format (serverUrl instead of url)
 */
export function buildServerUrlJson(config: McpServerConfig): string {
  let serverConfig: Record<string, unknown>;

  if (config.type === "http") {
    serverConfig = { serverUrl: config.url };
    if (config.headers && Object.keys(config.headers).length > 0) {
      serverConfig.headers = config.headers;
    }
  } else {
    serverConfig = buildServerConfigObject(config);
  }

  const output = {
    mcpServers: {
      [config.name]: serverConfig,
    },
  };
  return JSON.stringify(output, null, 2);
}

/**
 * Cline/Kilo Code/Roo Code format (streamable-http type)
 */
export function buildStreamableHttpJson(config: McpServerConfig): string {
  let serverConfig: Record<string, unknown> = buildServerConfigObject(config);

  if (config.type === "http") {
    serverConfig = { type: "streamable-http", ...serverConfig };
  }

  const output = {
    mcpServers: {
      [config.name]: serverConfig,
    },
  };
  return JSON.stringify(output, null, 2);
}

/**
 * Gemini CLI / Qwen Coder format (httpUrl instead of url)
 */
export function buildHttpUrlJson(config: McpServerConfig): string {
  let serverConfig: Record<string, unknown>;

  if (config.type === "http") {
    serverConfig = { httpUrl: config.url };
    if (config.headers && Object.keys(config.headers).length > 0) {
      serverConfig.headers = config.headers;
    }
  } else {
    serverConfig = buildServerConfigObject(config);
  }

  const output = {
    mcpServers: {
      [config.name]: serverConfig,
    },
  };
  return JSON.stringify(output, null, 2);
}

/**
 * Zed format (context_servers with source: custom)
 */
export function buildZedJson(config: McpServerConfig): string {
  // Zed only supports stdio
  const serverConfig = {
    source: "custom",
    command: config.type === "stdio" ? config.command : "npx",
    args: config.type === "stdio" ? (config.args ?? []) : [],
  };

  const output = {
    context_servers: {
      [capitalize(config.name)]: serverConfig,
    },
  };
  return JSON.stringify(output, null, 2);
}

/**
 * Augment Code format
 */
export function buildAugmentJson(config: McpServerConfig): string {
  const serverConfig = {
    name: config.name,
    command: config.type === "stdio" ? config.command : "npx",
    args: config.type === "stdio" ? (config.args ?? []) : [],
  };

  const output = {
    "augment.advanced": {
      mcpServers: [serverConfig],
    },
  };
  return JSON.stringify(output, null, 2);
}

/**
 * OpenCode format
 */
export function buildOpencodeJson(config: McpServerConfig): string {
  let serverConfig: Record<string, unknown>;

  if (config.type === "http") {
    serverConfig = {
      type: "remote",
      url: config.url,
      enabled: true,
    };
    if (config.headers && Object.keys(config.headers).length > 0) {
      serverConfig.headers = config.headers;
    }
  } else {
    serverConfig = {
      type: "local",
      command: [config.command, ...(config.args ?? [])],
      enabled: true,
    };
  }

  const output = {
    mcp: {
      [config.name]: serverConfig,
    },
  };
  return JSON.stringify(output, null, 2);
}

/**
 * Visual Studio format
 */
export function buildVisualStudioJson(config: McpServerConfig): string {
  let serverConfig: Record<string, unknown> = buildServerConfigObject(config);

  if (config.type === "http") {
    serverConfig = { type: "http", ...serverConfig };
  }

  const output = {
    inputs: [],
    servers: {
      [config.name]: serverConfig,
    },
  };
  return JSON.stringify(output, null, 2);
}

/**
 * Warp format
 */
export function buildWarpJson(config: McpServerConfig): string {
  const serverConfig = {
    command: config.type === "stdio" ? config.command : "npx",
    args: config.type === "stdio" ? (config.args ?? []) : [],
    env: config.type === "stdio" ? (config.env ?? {}) : {},
    working_directory: null,
    start_on_launch: true,
  };

  const output = {
    [capitalize(config.name)]: serverConfig,
  };
  return JSON.stringify(output, null, 2);
}

/**
 * Perplexity Desktop format
 */
export function buildPerplexityJson(config: McpServerConfig): string {
  const output = {
    args: config.type === "stdio" ? (config.args ?? []) : [],
    command: config.type === "stdio" ? config.command : "npx",
    env: config.type === "stdio" ? (config.env ?? {}) : {},
  };
  return JSON.stringify(output, null, 2);
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
