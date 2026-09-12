import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

// Import the createServer function from your server module
import { createServer } from "./server/index";

export default defineConfig(({ command, mode: _mode }) => ({
  base: command === "build" ? "/Portfolio/" : "/",
  server: {
    host: "::",
    port: 8080,
    watch: {
      usePolling: true,
    },
    fs: {
      allow: ["."],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**"],
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
