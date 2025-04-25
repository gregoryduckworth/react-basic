import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@context": path.resolve(__dirname, "src/context"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@config": path.resolve(__dirname, "src/config"),
      "@translations": path.resolve(__dirname, "src/translations"),
      "@types": path.resolve(__dirname, "../shared/types/api.ts"),
    },
  },
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },
});
