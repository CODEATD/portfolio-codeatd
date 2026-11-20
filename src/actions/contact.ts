import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { defaultLang } from "@/i18n/ui";
import { useTranslations } from "@/i18n/utils";

const t = useTranslations(defaultLang);

// An empty field arrives as null, not "": turn it into "" so each field's own message applies
const text = (schema: z.ZodString) => z.preprocess((value) => value ?? "", schema);

export const contact = {
    sendEmail: defineAction({
        accept: "form", // receives the <form> as FormData
        input: z.object({
            name: text(z.string().trim().min(1, t("form.errorName"))),
            email: z.email(t("form.errorEmail")),
            company: text(z.string().trim()), // optional
            projectType: text(z.string().min(1, t("form.errorType"))),
            message: text(z.string().trim().min(30, t("form.errorMessage"))),
            website: text(z.string()), // honeypot: people never see it, bots fill it
        }),
        handler: async (input) => {
            // Honeypot filled → a bot: answer "sent" and send nothing
            if (input.website) {
                return { error: false, message: t("form.sent") };
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
                    message: t("form.failed"),
                };
            }

            return {
                error: false,
                message: t("form.sent"),
            };
        },
    }),
};