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
