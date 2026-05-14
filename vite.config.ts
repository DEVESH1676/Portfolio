import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import fs from "node:fs";

// Function to search for the workspace root
function searchForWorkspaceRoot(cwd: string): string {
  let currentDir = cwd;
  while (currentDir !== path.parse(currentDir).root) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  throw new Error('Workspace root not found');
}

// Import the createServer function from your server module
import { createServer } from "./server/index";

export default defineConfig(({ mode: _mode }) => ({
  base: "/Portfolio/",
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [
        "./client",
        "./shared",
        searchForWorkspaceRoot(process.cwd()), // Dynamically find the workspace root
      ],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
