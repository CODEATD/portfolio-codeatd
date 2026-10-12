// Helpers (server-side)

//* WordPress: GET /pages?slug  returns an array with one page
export async function getPageBySlug(slug: string) {
    // Fetch page collection filtered by slug
    const res = await fetch(`${import.meta.env.API_URL}/pages?slug=${slug}`);
    const json = await res.json();
    // Return first match from the array
    return json[0];
}