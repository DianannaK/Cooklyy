import createI18nMiddleware from "next-intl/middleware";

export const locales = ["et", "en", "ru"] as const;
export const defaultLocale = "et";

export default createI18nMiddleware({
  locales,
  defaultLocale
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)"
  ]
};
