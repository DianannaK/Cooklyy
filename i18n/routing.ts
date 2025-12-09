import { createLocalizedPathnames, createRouter, createRedirect } from "next-intl/navigation";

export const locales = ["et", "en", "ru"] as const;
export const defaultLocale = "et";

export const pathnames = createLocalizedPathnames({
  "/": "/",
  "/retseptid": "/retseptid",
  "/admin": "/admin",
  "/login": "/login",
  "/register": "/register",
});

export const routing = {
  locales,
  defaultLocale,
  pathnames,
};

export const { Link, redirect, useRouter, usePathname } = createRouter(routing);
export const { redirect: redirectWithLocale } = createRedirect(routing);
