import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

import tailwindcss from '@tailwindcss/vite'

const FRONTEND_PORT = process.env.VITE_APP_PORT;

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
  },
  plugins: [react(),tailwindcss()],
  server: {
    port: Number(FRONTEND_PORT) || 5173,
    host: "localhost",
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@animations": path.resolve(__dirname, "src/components/animations"),
      "@fallback": path.resolve(__dirname, "src/components/fallback"),
      "@dialogs": path.resolve(__dirname, "src/components/dialogs"),
      "@ui": path.resolve(__dirname, "src/components/ui"),
      "@skeletons": path.resolve(__dirname, "src/components/skeletons"),
      "@components": path.resolve(__dirname, "src/components"),
      "@config": path.resolve(__dirname, "src/config"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@schemas": path.resolve(__dirname, "src/schemas"),
      "@services": path.resolve(__dirname, "src/services"),
      "@store": path.resolve(__dirname, "src/store"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@theme": path.resolve(__dirname, "src/theme"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@": path.resolve(__dirname, "src"),
    },
  },
});
