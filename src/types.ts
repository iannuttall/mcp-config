/**
 * MCP server configuration - either HTTP (remote) or stdio (local)
 */
export type McpServerConfig =
  | {
      name: string;
      type: "http";
      url: string;
      headers?: Record<string, string>;
    }
  | {
      name: string;
      type: "stdio";
      command: string;
      args?: string[];
      env?: Record<string, string>;
    };

/**
 * Configuration format type
 */
export type ConfigFormat = "json" | "cli" | "toml";

/**
 * MCP client metadata
 */
export type McpClient = {
  slug: string;
  name: string;
  format: ConfigFormat;
  supportsRemote: boolean;
  supportsLocal: boolean;
  docsUrl: string | null;
};

/**
 * Transform options
 */
export type TransformOptions = {
  server: McpServerConfig;
  client: string;
};

/**
 * Transform result
 */
export type TransformResult = {
  config: string;
  format: ConfigFormat;
  client: McpClient;
};
