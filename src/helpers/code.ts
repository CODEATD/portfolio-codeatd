import { codeToHtml } from "shiki";
import { decodeEntities } from "@/helpers";
import { defaultLang } from "@/i18n/ui";
import { useTranslations } from "@/i18n/utils";

const t = useTranslations(defaultLang);

// class="language-xxx" in WordPress → label and badge in the block header
const LANGUAGES: Record<string, { name: string; badge: string }> = {
    js: { name: "JavaScript", badge: "JS" },
    ts: { name: "TypeScript", badge: "TS" },
    astro: { name: "Astro", badge: "AS" },
    html: { name: "HTML", badge: "<>" },
    css: { name: "CSS", badge: "CSS" },
    php: { name: "PHP", badge: "PHP" },
    json: { name: "JSON", badge: "{}" },
    bash: { name: "Terminal", badge: "$" },
};

// <pre><code class="language-js">…</code></pre> (the <code> and its class are optional)
const CODE_BLOCK =
    /<pre[^>]*>(?:\s*<code(?:\s+class="language-([\w-]+)")?[^>]*>)?([\s\S]*?)(?:<\/code>\s*)?<\/pre>/g;

//* WordPress code blocks → highlighted at build time (Shiki) + header with badge and copy button
export async function highlightCode(html: string) {
    let result = html;

    for (const [block, lang = "", raw = ""] of html.matchAll(CODE_BLOCK)) {
        const language = LANGUAGES[lang];
        const code = decodeEntities(raw).trim();

        const highlighted = await codeToHtml(code, {
            lang: language ? lang : "text", // unknown language → plain text, no colors
            theme: "github-dark-default",
        });

        const figure = `
<figure class="code-block">
  <figcaption class="code-block__header">
    <span class="code-block__badge" aria-hidden="true">${language?.badge ?? "</>"}</span>
    <span>${language?.name ?? "Code"}</span>
    <button type="button" class="code-block__copy" data-copy-code data-done-label="${t("blog.codeCopied")}" aria-label="${t("blog.copyCode")}">
      <i class="ri-file-copy-line" aria-hidden="true"></i>
    </button>
  </figcaption>
  ${highlighted}
</figure>`;

        result = result.replace(block, () => figure);
    }

    return result;
}
