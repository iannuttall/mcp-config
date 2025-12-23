import { transformConfig, getClients } from "./src/index.js";

// Example HTTP server
const httpServer = {
  name: "playbooks",
  type: "http" as const,
  url: "https://playbooks.com/api/mcp",
  headers: { Authorization: "Bearer YOUR_API_KEY" },
};

// Example stdio server
const stdioServer = {
  name: "my-server",
  type: "stdio" as const,
  command: "npx",
  args: ["-y", "@example/mcp-server"],
  env: { API_KEY: "secret" },
};

// Pick which server to test
const server = httpServer;

// Test a few clients
const testClients = ["claude-desktop", "cursor", "vs-code", "windsurf", "claude-code", "cline"];

for (const clientSlug of testClients) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Client: ${clientSlug}`);
  console.log("=".repeat(60));

  try {
    const result = transformConfig({ server, client: clientSlug });
    console.log(`Format: ${result.format}`);
    console.log(`\n${result.config}`);
  } catch (e) {
    console.log(`Error: ${(e as Error).message}`);
  }
}
