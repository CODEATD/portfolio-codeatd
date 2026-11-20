import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export const contact = {
    sendEmail: defineAction({
        accept: "form", // receives the <form> as FormData
        input: z.object({
            name: z.string().trim().min(1, "Please tell me your name."),
            email: z.email("Enter a valid email so I can reply."),
            company: z.string().trim().default(""), // optional
            projectType: z.string().min(1, "Choose what you need."),
            message: z.string().trim().min(30, "A bit more detail, please (at least 30 characters)."),
            website: z.string().default(""), // honeypot: people never see it, bots fill it
        }),
        handler: async (input) => {
            // Honeypot filled → a bot: answer "sent" and send nothing
            if (input.website) {
                return { error: false, message: "Thanks! Your message is on its way." };
            }

            // Same names as the CF7 form (W3)
            const formData = new FormData();
            formData.append("your-name", input.name);
            formData.append("your-email", input.email);
            formData.append("your-company", input.company);
            formData.append("project-type", input.projectType);
            formData.append("your-message", input.message);
            formData.append("_wpcf7_unit_tag", "wpcf7-contact"); // CF7 requires it

            const res = await fetch(import.meta.env.CF7_FEEDBACK_URL, {
                method: "POST",
                body: formData,
            });
            const json = await res.json();

            // CF7 answers 200 even when it fails: the real result is in `status`
            if (json.status !== "mail_sent") {
                console.error("[contact] CF7:", json.status, json.invalid_fields ?? json.message);
                return {
                    error: true,
                    message: "Sorry, the message couldn't be sent. Please email me directly.",
                };
            }

            return {
                error: false,
                message: "Thanks! Your message is on its way. I'll reply within 24 hours.",
            };
        },
    }),
};