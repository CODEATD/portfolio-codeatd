// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  // Remote images Astro may optimize (WordPress local + production)
  image: {
    domains: ["codeatd.local", "cms.codeatd.dev"],
  },
});
