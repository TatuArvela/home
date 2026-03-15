/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import ReactCompiler from "babel-plugin-react-compiler";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/home/",
  plugins: [react({ babel: { plugins: [ReactCompiler] } }), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
  },
});
