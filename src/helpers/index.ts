import { marked } from "marked";

// Helpers (server-side)

//* WordPress: GET /pages?slug  returns an array with one page
export async function getPageBySlug(slug: string) {
    // Fetch page collection filtered by slug
    const res = await fetch(`${import.meta.env.API_URL}/pages?slug=${slug}`);
    const json = await res.json();
    // Return first match from the array
    return json[0];
}

//* WordPress: GET /{type} returns all entries of a post type (CPT)
export async function getPostType(type: string, query = "") {
    // per_page=100 → not only the first 10; query → extra params, e.g. "&orderby=menu_order&order=asc"
    const res = await fetch(`${import.meta.env.API_URL}/${type}?per_page=100${query}`);
    return res.json(); // an array (no json[0])
}

//* WordPress: GET /codeatd/v1/options returns all ACF Site Settings fields
export async function getOptions() {
    const res = await fetch(`${import.meta.env.API_CUSTOM_URL}/options`);
    return res.json(); // an object, not an array (no json[0])
}

//* paginate() makes "/blog/2", but /blog/[slug] (SSR) would catch that URL first.
//* WordPress-style "/blog/page/2" has one more segment, so it never clashes
export function withPagePrefix<T extends { params: { page?: string | number } }>(paths: T[]) {
    return paths.map((path) => ({
        ...path,
        params: { ...path.params, page: path.params.page ? `page/${path.params.page}` : undefined },
    }));
}

//* Format an ISO date, e.g. "2025-03-15T10:00:00" → "15 mar 2025"
export function formatDate(date: string, locale = "es") {
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(new Date(date));
}

//* Decode WordPress HTML entities: "&#8217;" → "’", "&lt;" → "<"
const ENTITIES: Record<string, string> = {
    "&amp;": "&",
    "&hellip;": "…",
    "&nbsp;": " ",
    "&quot;": '"',
    "&lt;": "<",
    "&gt;": ">",
};

export function decodeEntities(text: string) {
    return text
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code))) // &#8217;
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16))) // &#x27;
        .replace(/&[a-z]+;/g, (entity) => ENTITIES[entity] ?? entity); // &amp;
}

//* Plain text from WordPress HTML: no tags, entities decoded, single spaces
export function toPlainText(html: string) {
    return decodeEntities(html.replace(/<[^>]*>/g, " ")) // tags → spaces
        .replace(/\s+/g, " ")
        .trim();
}

//* Post content (Markdown or HTML, both valid) → HTML
export function contentToHtml(content: string) {
    // <pre> written in HTML may contain blank lines, and Markdown would split it there → keep it aside
    const blocks: string[] = [];
    const safe = content.replace(/<pre[\s\S]*?<\/pre>/g, (pre) => {
        blocks.push(pre);
        return `<!--pre:${blocks.length - 1}-->`;
    });

    const html = marked.parse(safe, { async: false, breaks: true });

    return html.replace(/<!--pre:(\d+)-->/g, (_, i) => blocks[Number(i)]);
}

//* Reading time in minutes (≈200 words per minute), at least 1
export function getReadingTime(html: string) {
    const words = toPlainText(html).split(" ").filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
}