import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@pageiq": path.resolve(__dirname, "./src"),
    },
  },
});
