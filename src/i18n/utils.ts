import { ui, defaultLang } from "@/i18n/ui";

export type Lang = keyof typeof ui;

//* Language from the URL: "/en/blog" → "en"; no prefix → the default one (es)
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  return lang in ui ? (lang as Lang) : defaultLang;
}

//* t("blog.readPost") → "Leer entrada"; a key missing in one language → the default language
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
