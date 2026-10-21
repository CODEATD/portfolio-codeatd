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
