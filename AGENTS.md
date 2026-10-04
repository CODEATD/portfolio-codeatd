## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project rules (read first)

Before working on this project, read the local (untracked) files in `Antigravity/`:

- `Antigravity/guidelines.md` — workflow, stack, design tokens, coding rules
- `Antigravity/best-practices.md` — Astro script lifecycle, Tailwind v4, a11y, GSAP, Git
- `Antigravity/issues.md` — known bugs and tech debt
- `Antigravity/guide.md` — current branch step-by-step guide

Key rule: do **not** modify `src/` by default. Write the code step by step in `Antigravity/guide.md`; the developer implements it commit by commit. Only edit project files when explicitly asked.
