// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Absolute URLs: canonical, Open Graph and the sitemap
  site: "https://codeatd.dev",
  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle the client libraries at startup. Discovering them later forces Vite to rebuild
    // its cache, and on Windows that rename fails (EPERM) if another program holds node_modules/.vite:
    // the scripts then 504 and the animations, the slider and the map stop working in dev.
    optimizeDeps: {
      include: [
        "gsap",
        "gsap/ScrollTrigger",
        "gsap/SplitText",
        "swiper",
        "swiper/modules",
        "notyf",
        "leaflet",
        "astro/actions/runtime/entrypoints/client.js", // astro:actions (the contact form)
      ],
    },
  },
  // Remote images Astro may optimize (WordPress local + production)
  image: {
    domains: ["codeatd.local", "cms.codeatd.dev"],
  },
  // Netlify: the site stays static; only pages with prerender = false (/blog/[slug], /projects) run on the server
  // Dev: no Edge Functions emulation (unused; its Deno server fails on Windows and slows the start)
  adapter: netlify({
    devFeatures: { edgeFunctions: false },
  }),
  // sitemap-index.xml: static pages + /projects (SSR without params). Posts and project filters stay out
  integrations: [sitemap()],
});
