import { z } from "astro/zod";
import { contentToHtml, getReadingTime, toPlainText } from "@/helpers";

//* Fields shared by every WordPress page
export const BaseWPSchema = z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({
        rendered: z.string(),
    }),
    content: z.object({
        rendered: z.string(),
    }),
});

//* About page (ACF Pro: heading + stats repeater)
const StatSchema = z.object({
    value: z.string(),
    label: z.string(),
});

export const AboutPageSchema = BaseWPSchema.extend({
    acf: z.object({
        heading: z.string(),
        stats: z.array(StatSchema).catch([]), // empty repeater → ACF sends false
    }),
});

export type Stat = z.infer<typeof StatSchema>;

//* Stack page (ACF Pro: heading + skills repeater)
const SkillSchema = z.object({
    name: z.string(),
    featured: z.boolean().catch(false),
});

export const StackPageSchema = BaseWPSchema.extend({
    acf: z.object({
        heading: z.string(),
        skills: z.array(SkillSchema).catch([]), // empty repeater → ACF sends false
    })
});

export type Skill = z.infer<typeof SkillSchema>;

//* Section page (ACF: heading + optional button text) → Experience, Projects, FAQ, Blog
export const SectionPageSchema = BaseWPSchema.extend({
    acf: z.object({
        heading: z.string(),
        cta_text: z.string().catch(""), // empty → the component's default text
    }),
});

export type SectionPage = z.infer<typeof SectionPageSchema>;

//* Showreel page (ACF: video file + poster)
export const ShowreelPageSchema = BaseWPSchema.extend({
    acf: z.object({
        video: z.string(), // MP4 url (ACF File → URL)
        poster: z.string().catch(""), // no poster → false → ""
    }),
});

//* Taxonomy term (custom REST field, e.g. technology_details)
const TermSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
});

//* Experience CPT (ACF + technology_details)

const ExperienceSchema = BaseWPSchema.pick({
    id: true,
    title: true,
})
    .extend({
        acf: z.object({
            company: z.string(),
            start_year: z.coerce.number(),
            end_year: z.coerce.number().catch(0), // empty → 0
            description: z.string(),
        }),
        technology_details: z.array(TermSchema),
    })
    // Flat shape for the component
    .transform(({ id, title, acf, technology_details }) => ({
        id,
        role: title.rendered,
        company: acf.company,
        start: acf.start_year,
        end: acf.end_year || null, // 0 → null → "Present"
        description: acf.description,
        technologies: technology_details.map((term) => term.name),
    }));

export const ExperiencesSchema = z.array(ExperienceSchema);

export type Experience = z.infer<typeof ExperienceSchema>;

//* Site Settings (ACF Options Page via /codeatd/v1/options)
const SocialLinkSchema = z.object({
    name: z.string(),
    url: z.string(),
    icon: z.string(), // RemixIcon class, e.g. "ri-instagram-line"
});

//* ACF image (Return Format: Image Array) → the shape <Picture> needs
const AcfImageSchema = z
    .object({ url: z.string(), width: z.number(), height: z.number(), alt: z.string() })
    .transform(({ url, width, height, alt }) => ({ src: url, width, height, alt }))
    .optional()
    .catch(undefined); // no image → false → undefined → the component's default image

// Empty ACF text → undefined → the component's default text
const OptionalTextSchema = z.string().catch("").transform((value) => value || undefined);

//* Home → Hero (ACF Group on Site Settings)
const HeroSchema = z.object({
    tag: OptionalTextSchema,
    greeting: OptionalTextSchema,
    title: OptionalTextSchema,
    highlight: OptionalTextSchema,
    description: OptionalTextSchema,
    primary_text: OptionalTextSchema,
    cv_text: OptionalTextSchema,
    badge_text: OptionalTextSchema,
    image_light: AcfImageSchema,
    image_dark: AcfImageSchema,
});

export const OptionsSchema = z.object({
    contact_email: z.string(),
    contact_phone: z.string(),
    contact_location: z.string(),
    social_links: z.array(SocialLinkSchema).catch([]), // empty repeater → false
    cv_file: z.string().catch(""), // no CV → false → ""
    hero: HeroSchema.catch(HeroSchema.parse({})), // group missing → every field undefined
});

export type SocialLink = z.infer<typeof SocialLinkSchema>;

//* WordPress image sizes (custom REST field featured_images)
const ImageSchema = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number(),
});

const FeaturedImagesSchema = z.object({
    thumbnail: ImageSchema,
    medium: ImageSchema,
    medium_large: ImageSchema,
    large: ImageSchema,
    full: ImageSchema,
});

export type FeaturedImages = z.infer<typeof FeaturedImagesSchema>;

//* Project CPT (ACF + featured_images + technology_details + project_category_details)
const ProjectSchema = BaseWPSchema.pick({
    id: true,
    slug: true,
    title: true,
})
    .extend({
        featured_images: FeaturedImagesSchema,
        acf: z.object({
            description: z.string(),
            live_url: z.string().catch(""), // empty → no "Ver sitio"
            repo_url: z.string().catch(""), // empty → no "Ver código"
        }),
        technology_details: z.array(TermSchema),
        project_category_details: z.array(TermSchema),
    })
    // Flat shape for the components
    .transform(
        ({ id, slug, title, featured_images, acf, technology_details, project_category_details }) => ({
            id,
            slug, // → /projects/[slug] (single-project, later)
            title: title.rendered,
            category: project_category_details[0]?.name ?? "", // card label: first category
            categorySlugs: project_category_details.map((term) => term.slug), // /projects/category/[slug] filter
            description: acf.description,
            liveUrl: acf.live_url,
            repoUrl: acf.repo_url,
            image: featured_images,
            technologies: technology_details.map((term) => term.name),
        }),
    );

export const ProjectsSchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

//* Testimonial CPT (ACF + featured_images → avatar)
const TestimonialSchema = BaseWPSchema.pick({
    id: true,
    title: true,
})
    .extend({
        featured_images: z
            .object({ thumbnail: ImageSchema }) // 150 × 150 crop → avatar
            .nullable()
            .catch(null), // no featured image → false → null
        acf: z.object({
            quote: z.string(),
            role: z.string(),
            company: z.string().catch(""), // empty → only the role
        }),
    })
    // Flat shape for the component
    .transform(({ id, title, featured_images, acf }) => ({
        id,
        name: title.rendered,
        quote: acf.quote,
        role: acf.role,
        company: acf.company,
        avatar: featured_images?.thumbnail ?? null,
    }));

export const TestimonialsSchema = z.array(TestimonialSchema);

export type Testimonial = z.infer<typeof TestimonialSchema>;

//* FAQ CPT (title = question, editor = answer HTML, faq_topic_details = topic)
const FaqSchema = BaseWPSchema.pick({
    id: true,
    title: true,
    content: true,
})
    .extend({
        faq_topic_details: z.array(TermSchema).catch([]), // no topic → []
    })
    // Flat shape for the component
    .transform(({ id, title, content, faq_topic_details }) => ({
        id,
        question: title.rendered,
        answer: content.rendered, // HTML: paragraphs, links, lists, images
        topic: faq_topic_details[0]?.name ?? "", // label: first topic
    }));

export const FaqsSchema = z.array(FaqSchema);

export type Faq = z.infer<typeof FaqSchema>;

//* Blog post (WP posts + content_raw + featured_images + category_details)
export const PostSchema = BaseWPSchema.pick({
    id: true,
    slug: true,
    title: true,
    content: true,
})
    .extend({
        date: z.string(),
        excerpt: z.object({ rendered: z.string() }),
        content_raw: z.string().catch(""), // as written (Markdown or HTML), W2b
        featured_images: FeaturedImagesSchema.nullable().catch(null), // no image → false → null
        category_details: z.array(TermSchema).catch([]),
    })
    // Flat shape for the components
    .transform(
        ({ id, slug, title, content, content_raw, date, excerpt, featured_images, category_details }) => {
            // Markdown or HTML → HTML. Without content_raw (W2b missing) → WordPress's own HTML
            const html = content_raw ? contentToHtml(content_raw) : content.rendered;

            return {
                id,
                slug, // → /blog/[slug]
                title: title.rendered, // HTML entities → set:html
                date,
                excerpt: toPlainText(excerpt.rendered).replace(/\s*\[…\]$/, "…"), // "text […]" → "text…"
                content: html,
                image: featured_images,
                categories: category_details, // [{ id, name, slug }]
                readingTime: getReadingTime(html),
            };
        },
    );

export const PostsSchema = z.array(PostSchema);

export type Post = z.infer<typeof PostSchema>;

//* Blog category (WP /categories) + number of posts
const CategorySchema = TermSchema.extend({
    count: z.number(),
});

export const CategoriesSchema = z.array(CategorySchema);

export type Category = z.infer<typeof CategorySchema>;

//* Contact page (ACF: heading, availability, reply_time, clients_map → OpenStreetMap, Raw Data)
const MarkerSchema = z.object({
    label: z.string(), // "Spain"
    lat: z.number(),
    lng: z.number(),
});

export const ContactPageSchema = BaseWPSchema.extend({
    acf: z.object({
        heading: z.string(),
        availability: z.string().catch(""), // empty → no pill
        reply_time: z.string().catch(""), // empty → hidden
        clients_map: z
            .object({ markers: z.array(MarkerSchema) })
            .nullable()
            .catch(null), // no map → false → null
    }),
});

export type Marker = z.infer<typeof MarkerSchema>;