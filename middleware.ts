import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['et', 'en', 'ru'],
    defaultLocale: 'et'
});

export const config = {
    matcher: ['/((?!_next|.*\\..*).*)']
};
