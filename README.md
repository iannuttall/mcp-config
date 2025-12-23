# MCP Config

Turn one MCP server setup into the right format for lots of apps.

- Keep one setup
- Get the right file or command for each app
- Skip hand edits across many formats

## Quick start

- Copy `src/` into your project
- Import the helpers
- Pick a client and transform

```typescript
import { transformConfig, getClients } from "./src/index.js";

// List all supported clients
const clients = getClients();
// => [{ slug: "claude-desktop", name: "Claude Desktop", format: "json", ... }, ...]

const httpServer = {
  name: "playbooks",
  type: "http",
  url: "https://playbooks.com/api/mcp",
  headers: { Authorization: "Bearer YOUR_API_KEY" },
};

const stdioServer = {
  name: "my-server",
  type: "stdio",
  command: "npx",
  args: ["-y", "@example/mcp-server"],
  env: { API_KEY: "secret" },
};

// Make JSON for Cursor
const result = transformConfig({
  server: httpServer,
  client: "cursor",
});

console.log(result.config);
// {
//   "mcpServers": {
//     "playbooks": {
//       "url": "https://playbooks.com/api/mcp",
//       "headers": {
//         "Authorization": "Bearer YOUR_API_KEY"
//       }
//     }
//   }
// }

// Make a CLI command for Claude Code
const cliResult = transformConfig({
  server: stdioServer,
  client: "claude-code",
});

console.log(cliResult.config);
// => claude mcp add my-server -- npx -y @example/mcp-server
```

## Running tests

```bash
bun install
bun test
```

## Supported clients

### JSON
- Claude Desktop
- Cursor
- Windsurf
- VS Code / Copilot
- Cline / Kilo Code / Roo Code
- Zed
- JetBrains IDEs
- Amazon Q
- LM Studio
- Gemini CLI
- Augment Code
- OpenCode
- Visual Studio
- Warp
- Perplexity Desktop
- Kiro, Trae, BoltAI, Crush
- And more

### CLI
- Claude Code
- Amp
- Factory (Droid)
- Rovo Dev
- OpenAI Codex CLI

## API

### `transformConfig(options)`

Transform a server config for a specific client.

```typescript
type TransformOptions = {
  server: McpServerConfig;
  client: string; // client slug
};

type TransformResult = {
  config: string; // The transformed config string
  format: ConfigFormat; // "json" | "cli" | "toml"
  client: McpClient; // Client metadata
};
```

### `getClients()`

Get all supported clients.

### `getClient(slug)`

Get a specific client by slug.

### `getClientsByTransport(transport)`

Get clients that support remote (HTTP) or local (stdio) servers.

## Types

```typescript
type McpServerConfig =
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

type McpClient = {
  slug: string;
  name: string;
  format: "json" | "cli" | "toml";
  supportsRemote: boolean;
  supportsLocal: boolean;
  docsUrl: string | null;
};
```

## File structure

```
src/
├── index.ts           # Main exports
├── types.ts           # TypeScript types
├── clients.ts         # Client list
├── transform.ts       # Transform logic
├── transform.test.ts  # Tests
└── formats/
    ├── json.ts        # JSON builders
    ├── cli.ts         # CLI builders
    └── toml.ts        # TOML builder
```

## License

MIT
