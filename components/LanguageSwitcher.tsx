"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./LanguageSwitcher.module.css";

const LOCALES = [
    { code: "et", label: "Eesti", flag: "🇪🇪" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const current = LOCALES.find(l => l.code === locale) ?? LOCALES[0];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        function handleKey(event: KeyboardEvent) {
            if (event.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKey);
        };
    }, []);

    function switchLocale(code: string) {
        if (!pathname) return;
        if (code === locale) {
            setOpen(false);
            return;
        }

        // Split pathname to handle locale segment
        // Example: /et/blog -> ["", "et", "blog"]
        // Example: /en -> ["", "en"]
        const segments = pathname.split("/");

        // Replace the locale segment (index 1) with new code
        if (segments.length > 1) {
            segments[1] = code;
        } else {
            // Handle edge case where path might be empty or just slash (though typical Next.js paths start with /)
            segments.splice(0, 0, "", code);
        }

        // Reconstruct path
        const nextPath = segments.join("/") || "/";
        router.push(nextPath);
        setOpen(false);
    }

    return (
        <div className={styles.wrapper} ref={ref}>
            <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpen(prev => !prev)}
                aria-expanded={open}
                aria-haspopup="listbox"
            >
                <span className={styles.flag}>{current.flag}</span>
                <span className={styles.code}>{current.code.toUpperCase()}</span>
                <span className={styles.chevron}>▾</span>
            </button>
            {open && (
                <div className={styles.menu} role="listbox">
                    {LOCALES.map(option => (
                        <button
                            key={option.code}
                            type="button"
                            role="option"
                            aria-selected={option.code === locale}
                            className={`${styles.item} ${option.code === locale ? styles.itemActive : ""
                                }`}
                            onClick={() => switchLocale(option.code)}
                        >
                            <span className={styles.flag}>{option.flag}</span>
                            <div className={styles.textColumn}>
                                <span className={styles.label}>{option.label}</span>
                                <span className={styles.subLabel}>{option.code.toUpperCase()}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
