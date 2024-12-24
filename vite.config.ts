import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig(() => {
  return {
    test: {
      watch: false,
      include: ["mt-static/plugins/MTBlockEditor/src/**/*.{test,spec}.{js,ts}"],
      globals: true,
      environment: "jsdom",
      setupFiles: [
        "./test/setup.ts",
        "./mt-static/plugins/MTBlockEditor/dist/mt-block-editor/1.1.53/mt-block-editor.js",
      ],
    },
    resolve: {
      alias: {
        jquery: path.resolve(__dirname, "./test/mock/jquery.ts"),
      },
    },
  };
});
