# CODE ATD — Portfolio

Personal portfolio and blog of **Adolfo Torres** (CODE ATD), Full Stack Developer based in Valencia, Venezuela.

A **headless WordPress** site: content is managed in WordPress (ACF + REST API) and rendered by **Astro**, deployed on **Netlify**.

## Stack

| Layer | Tech |
| :-- | :-- |
| Front end | [Astro 7](https://astro.build) · TypeScript · [Tailwind CSS 4](https://tailwindcss.com) |
| Motion | [GSAP](https://gsap.com) (ScrollTrigger, SplitText) · View Transitions (`ClientRouter`) |
| Content | WordPress (headless) · Advanced Custom Fields Pro · custom theme `codeatd` |
| Data validation | [Zod](https://zod.dev) schemas for every WordPress response |
| Contact form | Astro Actions → Contact Form 7 REST API → WP Mail SMTP + Brevo |
| UI libraries | Swiper · Leaflet (OpenStreetMap) · Notyf · Shiki · Remix Icon |
| Hosting | Netlify (`@astrojs/netlify`) |

## How it works

- **Static by default.** Home, `/blog`, category pages and `/contact` are generated at build time from the WordPress REST API.
- **Server-rendered where it helps.** Single blog posts (`/blog/[slug]`) render on each request, so new posts appear without a rebuild.
- **Contact form.** The form posts to an Astro Action, which validates the input with Zod and forwards it to Contact Form 7. The mail provider's API key lives only in WordPress, never in this repo.
- **Typed content.** Every WordPress response goes through a Zod schema (`src/types`), so missing or malformed fields fail loudly at build time instead of breaking the page.

## Features

- Sections driven by ACF: hero, about, stack, experience, projects, showreel, testimonials, FAQ and blog.
- Blog with pagination, categories, reading time, syntax highlighting and share links.
- Contact page with validation, toasts, a honeypot and an animated clients map.
- Light / dark theme with a circular reveal, page transitions and reduced-motion support.

## Getting started

Requirements: Node.js 22+ and a WordPress install with the `codeatd` theme and its plugins (ACF Pro, Contact Form 7, WP Mail SMTP, ACF OpenStreetMap Field).

```bash
npm install
```

Create the environment file for your WordPress instance (`.env.development` is already set up for the local site):

```bash
API_URL=https://your-wordpress-site/wp-json/wp/v2
API_CUSTOM_URL=https://your-wordpress-site/wp-json/codeatd/v1
CF7_FEEDBACK_URL=https://your-wordpress-site/wp-json/contact-form-7/v1/contact-forms/<form-id>/feedback
```

| Command | Action |
| :-- | :-- |
| `npm run dev` | Dev server at `http://localhost:4321` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |

## Project structure

```text
src/
├── actions/      # Astro Actions (contact form)
├── assets/       # Images processed by astro:assets
├── components/   # One folder per section, plus shared UI
├── config/       # Site config: navigation, metadata
├── helpers/      # WordPress fetch helpers, formatting
├── layouts/      # Base layout (SEO, theme, transitions)
├── pages/        # Routes: home, blog, contact, 404
├── styles/       # Tailwind theme tokens and utilities
└── types/        # Zod schemas for WordPress data
```

## Deployment

Netlify builds the site with `npm run build`. Set `API_URL`, `API_CUSTOM_URL` and `CF7_FEEDBACK_URL` in *Site configuration → Environment variables*, pointing to the production WordPress.

## Author

**Adolfo Torres** · [codeatd.dev](https://codeatd.dev) · [LinkedIn](https://linkedin.com/in/codeatd) · [GitHub](https://github.com/CODEATD)
