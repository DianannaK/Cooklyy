import { NextIntlClientProvider } from "next-intl";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/components/Toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './page.module.css';

export default async function LocaleLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        console.error("Locale messages load error:", error);
        messages = {};
    }

    return (
        <NextIntlClientProvider messages={messages}>
            <AuthProvider>
                <ToastProvider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </ToastProvider>
            </AuthProvider>
        </NextIntlClientProvider>
    );
}
