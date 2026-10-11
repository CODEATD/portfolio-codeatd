// Brands for the LogoMarquee.
import type { SvgComponent } from "astro/types";

import figma from "@/assets/brands/figma.svg";
import supabase from "@/assets/brands/supabase.svg";
import netlify from "@/assets/brands/netlify.svg";
import framer from "@/assets/brands/framer.svg";
import react from "@/assets/brands/react.svg";
import vue from "@/assets/brands/vue.svg";
import cursor from "@/assets/brands/cursor.svg";
import openai from "@/assets/brands/openai.svg";
import github from "@/assets/brands/github.svg";
import notion from "@/assets/brands/notion.svg";
import flutter from "@/assets/brands/flutter.svg";
import astro from "@/assets/brands/astro.svg";
import expo from "@/assets/brands/expo.svg";
import tailwindCss from "@/assets/brands/tailwind-css.svg";
import n8n from "@/assets/brands/n8n.svg";
import gemini from "@/assets/brands/gemini.svg";
import docker from "@/assets/brands/docker.svg";
import wordpress from "@/assets/brands/wordpress.svg";
import unity from "@/assets/brands/unity.svg";
import photoshop from "@/assets/brands/photoshop.svg";
import afterEffects from "@/assets/brands/after-effects.svg";
import premierePro from "@/assets/brands/premiere-pro.svg";
import typescript from "@/assets/brands/typescript.svg";
import nodejs from "@/assets/brands/nodejs.svg";
import nextjs from "@/assets/brands/nextjs.svg";
import dart from "@/assets/brands/dart.svg";
import php from "@/assets/brands/php.svg";
import git from "@/assets/brands/git.svg";
import shopify from "@/assets/brands/shopify.svg";
import mongodb from "@/assets/brands/mongodb.svg";
import gsap from "@/assets/brands/gsap.svg";
import woocommerce from "@/assets/brands/woocommerce.svg";

export interface Brand {
  name: string; // shown in the tooltip
  icon: SvgComponent;
}

export const trustedBrands: Brand[] = [
  { name: "Figma", icon: figma },
  { name: "Supabase", icon: supabase },
  { name: "Netlify", icon: netlify },
  { name: "Framer", icon: framer },
  { name: "React", icon: react },
  { name: "Vue", icon: vue },
  { name: "Cursor", icon: cursor },
  { name: "OpenAI", icon: openai },
  { name: "GitHub", icon: github },
  { name: "Notion", icon: notion },
  { name: "Flutter", icon: flutter },
  { name: "Astro", icon: astro },
  { name: "Expo", icon: expo },
  { name: "Tailwind CSS", icon: tailwindCss },
  { name: "n8n", icon: n8n },
  { name: "Gemini", icon: gemini },
  { name: "Docker", icon: docker },
  { name: "WordPress", icon: wordpress },
  { name: "Unity", icon: unity },
  { name: "Photoshop", icon: photoshop },
  { name: "After Effects", icon: afterEffects },
  { name: "Premiere Pro", icon: premierePro },
  { name: "TypeScript", icon: typescript },
  { name: "Node.js", icon: nodejs },
  { name: "Next.js", icon: nextjs },
  { name: "Dart", icon: dart },
  { name: "PHP", icon: php },
  { name: "Git", icon: git },
  { name: "Shopify", icon: shopify },
  { name: "MongoDB", icon: mongodb },
  { name: "GSAP", icon: gsap },
  { name: "WooCommerce", icon: woocommerce },
];
