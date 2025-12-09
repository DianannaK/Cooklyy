'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import styles from './Header.module.css';

export default function Header() {
    const t = useTranslations('nav');
    const tCats = useTranslations('categories');
    const tCommon = useTranslations('common');
    const pathname = usePathname();
    const router = useRouter();
    const { user, openModal, signOut } = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLangOpen, setIsLangOpen] = useState(false);

    // Extract current locale from pathname
    const parts = pathname?.split('/') || [];
    const currentLocale = parts[1] || 'et';
    const pathWithoutLocale = parts.slice(2).join('/');

    async function handleSignOut() {
        await signOut();
        window.location.href = `/${currentLocale}`;
    }

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/${currentLocale}/retseptid?q=${encodeURIComponent(searchQuery)}`);
        }
    }

    function switchLocale(newLocale: string) {
        const newPath = `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`;
        router.push(newPath);
        setIsLangOpen(false);
    }

    const navItems = [
        { href: `/${currentLocale}`, label: t('home'), exact: true },
        { href: `/${currentLocale}/retseptid`, label: t('recipes') },
        { href: `/${currentLocale}/blog`, label: t('blog') },
        { href: `/${currentLocale}/kontakt`, label: t('contact') },
    ];

    const languages = [
        { code: 'et', name: 'Eesti', flag: '🇪🇪' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    ];

    const currentLang = languages.find(l => l.code === currentLocale) || languages[0];

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    {/* Logo */}
                    <Link href={`/${currentLocale}`} className={styles.logo}>
                        <span className={styles.logoIcon}>👨‍🍳</span>
                        <span className={styles.logoText}>Cookly</span>
                    </Link>

                    {/* Center Navigation */}
                    <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                        {navItems.map((item) => {
                            const isActive = item.exact
                                ? pathname === item.href
                                : pathname?.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Actions */}
                    <div className={styles.actions}>
                        {/* Search */}
                        <form onSubmit={handleSearch} className={styles.searchForm}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={tCommon('search')}
                                className={styles.searchInput}
                            />
                            <button type="submit" className={styles.searchBtn} aria-label="Search">
                                🔍
                            </button>
                        </form>

                        {/* Language Selector */}
                        <div className={styles.langSelector}>
                            <button
                                className={styles.langBtn}
                                onClick={() => setIsLangOpen(!isLangOpen)}
                            >
                                <span className={styles.flagIcon}>{currentLang.flag}</span>
                                <span>{currentLang.code.toUpperCase()}</span>
                            </button>
                            {isLangOpen && (
                                <div className={styles.langDropdown}>
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => switchLocale(lang.code)}
                                            className={`${styles.langOption} ${lang.code === currentLocale ? styles.active : ''}`}
                                        >
                                            <span className={styles.flagIcon}>{lang.flag}</span>
                                            <span>{lang.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* User Menu */}
                        {user ? (
                            <div className={styles.userMenu}>
                                <button className={styles.userBtn}>
                                    {user.user_metadata?.avatar_url ? (
                                        <img src={user.user_metadata.avatar_url} alt="Profile" className={styles.userAvatar} />
                                    ) : (
                                        <span className={styles.userIcon}>👤</span>
                                    )}
                                </button>
                                <div className={styles.dropdown}>
                                    <div className={styles.dropdownItem}>
                                        {user.user_metadata?.display_name || user.email}
                                    </div>
                                    <Link href={`/${currentLocale}/profiil`} className={styles.dropdownItem}>
                                        {t('profile')}
                                    </Link>
                                    <Link href={`/${currentLocale}/profiil`} className={styles.dropdownItem}>
                                        {t('my_recipes')}
                                    </Link>
                                    <Link href={`/${currentLocale}/profiil`} className={styles.dropdownItem}>
                                        {t('favorites')}
                                    </Link>
                                    <Link href={`/${currentLocale}/profiil`} className={styles.dropdownItem}>
                                        {t('shopping_list')}
                                    </Link>
                                    <button onClick={handleSignOut} className={styles.dropdownItem}>
                                        {t('logout')}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => openModal('login')} className={styles.userBtn}>
                                <span className={styles.userIcon}>👤</span>
                            </button>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className={styles.menuToggle}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>
            <AuthModal />
        </>
    );
}
