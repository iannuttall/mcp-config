// Main API
export { transformConfig } from "./transform.js";
export { getClients, getClient, getClientsByTransport } from "./clients.js";

// Types
export type {
  McpServerConfig,
  McpClient,
  ConfigFormat,
  TransformOptions,
  TransformResult,
} from "./types.js";
