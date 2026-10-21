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
export async function getPostType(type: string) {
    // per_page=100 → not only the first 10
    const res = await fetch(`${import.meta.env.API_URL}/${type}?per_page=100`);
    return res.json(); // an array (no json[0])
}