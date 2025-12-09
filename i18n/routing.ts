import { createI18nRouting } from "next-intl/routing";

export const routing = createI18nRouting({
  locales: ["et", "en", "ru"],
  defaultLocale: "et"
});

// NEED tulevad routingust, MITTE configist
export const {
  Link,
  redirect,
  usePathname,
  useRouter
} = routing;
