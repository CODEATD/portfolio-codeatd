import { z } from "astro/zod";

// Fields shared by every WordPress page
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

// About page (ACF Pro: heading + stats repeater)
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