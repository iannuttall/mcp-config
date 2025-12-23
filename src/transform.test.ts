import { describe, it, expect } from "bun:test";
import { transformConfig, getClients, getClient } from "./index.js";

describe("getClients", () => {
  it("returns all clients", () => {
    const clients = getClients();
    expect(clients.length).toBeGreaterThan(20);
    expect(clients.find((c) => c.slug === "claude-desktop")).toBeDefined();
  });
});

describe("getClient", () => {
  it("returns a client by slug", () => {
    const client = getClient("cursor");
    expect(client).toBeDefined();
    expect(client?.name).toBe("Cursor");
  });

  it("returns undefined for unknown client", () => {
    const client = getClient("unknown");
    expect(client).toBeUndefined();
  });
});

describe("transformConfig", () => {
  describe("HTTP server", () => {
    const httpServer = {
      name: "my-server",
      type: "http" as const,
      url: "https://api.example.com/mcp",
      headers: { Authorization: "Bearer token123" },
    };

    it("transforms for Claude Desktop", () => {
      const result = transformConfig({
        server: httpServer,
        client: "claude-desktop",
      });

      expect(result.format).toBe("json");
      const parsed = JSON.parse(result.config);
      expect(parsed.mcpServers["my-server"].url).toBe(
        "https://api.example.com/mcp"
      );
      expect(parsed.mcpServers["my-server"].headers.Authorization).toBe(
        "Bearer token123"
      );
    });

    it("transforms for Cursor", () => {
      const result = transformConfig({
        server: httpServer,
        client: "cursor",
      });

      const parsed = JSON.parse(result.config);
      expect(parsed.mcpServers["my-server"].url).toBe(
        "https://api.example.com/mcp"
      );
    });

    it("transforms for VS Code", () => {
      const result = transformConfig({
        server: httpServer,
        client: "vs-code",
      });

      const parsed = JSON.parse(result.config);
      expect(parsed.mcp.servers["my-server"].type).toBe("http");
      expect(parsed.mcp.servers["my-server"].url).toBe(
        "https://api.example.com/mcp"
      );
    });

    it("transforms for Windsurf (serverUrl)", () => {
      const result = transformConfig({
        server: httpServer,
        client: "windsurf",
      });

      const parsed = JSON.parse(result.config);
      expect(parsed.mcpServers["my-server"].serverUrl).toBe(
        "https://api.example.com/mcp"
      );
    });

    it("transforms for Claude Code (CLI)", () => {
      const result = transformConfig({
        server: httpServer,
        client: "claude-code",
      });

      expect(result.format).toBe("cli");
      expect(result.config).toContain("claude mcp add --transport http");
      expect(result.config).toContain("my-server");
      expect(result.config).toContain("https://api.example.com/mcp");
      expect(result.config).toContain('--header "Authorization: Bearer token123"');
    });
  });

  describe("stdio server", () => {
    const stdioServer = {
      name: "local-server",
      type: "stdio" as const,
      command: "npx",
      args: ["-y", "@example/mcp-server"],
      env: { API_KEY: "secret" },
    };

    it("transforms for Claude Desktop", () => {
      const result = transformConfig({
        server: stdioServer,
        client: "claude-desktop",
      });

      const parsed = JSON.parse(result.config);
      expect(parsed.mcpServers["local-server"].command).toBe("npx");
      expect(parsed.mcpServers["local-server"].args).toEqual([
        "-y",
        "@example/mcp-server",
      ]);
      expect(parsed.mcpServers["local-server"].env.API_KEY).toBe("secret");
    });

    it("transforms for Claude Code (CLI)", () => {
      const result = transformConfig({
        server: stdioServer,
        client: "claude-code",
      });

      expect(result.config).toContain("claude mcp add local-server");
      expect(result.config).toContain("npx -y @example/mcp-server");
    });

    it("transforms for OpenAI Codex (TOML)", () => {
      const result = transformConfig({
        server: stdioServer,
        client: "openai-codex",
      });

      expect(result.format).toBe("toml");
      expect(result.config).toContain("[mcp_servers.local-server]");
      expect(result.config).toContain('command = "npx"');
      expect(result.config).toContain('"-y", "@example/mcp-server"');
    });
  });

  it("throws for unknown client", () => {
    expect(() =>
      transformConfig({
        server: { name: "test", type: "http", url: "https://example.com" },
        client: "unknown-client",
      })
    ).toThrow("Unknown client: unknown-client");
  });

  it("throws when client doesn't support transport", () => {
    expect(() =>
      transformConfig({
        server: { name: "test", type: "http", url: "https://example.com" },
        client: "zed", // Zed only supports stdio
      })
    ).toThrow("does not support remote");
  });
});
