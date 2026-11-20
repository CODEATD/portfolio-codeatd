// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  // Remote images Astro may optimize (WordPress local + production)
  image: {
    domains: ["codeatd.local", "cms.codeatd.dev"],
  },
  // Netlify: the site stays static; only pages with prerender = false (/blog/[slug]) run on the server
  adapter: netlify({
    devFeatures: false,
  }),
});
