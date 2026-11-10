import { z } from "astro/zod";

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

//* Section page (ACF: heading) → Experience, later Projects/Blog
export const SectionPageSchema = BaseWPSchema.extend({
    acf: z.object({
        heading: z.string(),
    }),
});

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

export const OptionsSchema = z.object({
    contact_email: z.string(),
    contact_phone: z.string(),
    contact_location: z.string(),
    social_links: z.array(SocialLinkSchema).catch([]), // empty repeater → false
    cv_file: z.string().catch(""), // no CV → false → ""
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
            live_url: z.string().catch(""), // empty → no "Visit Live"
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
            description: acf.description,
            liveUrl: acf.live_url,
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