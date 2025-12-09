import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './Footer.module.css';

export default function Footer() {
    const t = useTranslations('footer');

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h3>{t('legal_title')}</h3>
                    <Link href="/privaatsuspoliitika">{t('privacy')}</Link>
                    <Link href="/kasutustingimused">{t('terms')}</Link>
                    <Link href="/kkk">{t('faq')}</Link>
                </div>

                <div className={styles.section}>
                    <h3>{t('contact_title')}</h3>
                    <a href={`mailto:${t('email')}`}>
                        <span className={styles.icon}>📧</span>
                        {t('email')}
                    </a>
                    <a href={`tel:${t('phone').replace(/\s/g, '')}`}>
                        <span className={styles.icon}>📞</span>
                        {t('phone')}
                    </a>
                    <p>
                        <span className={styles.icon}>📍</span>
                        {t('location')}
                    </p>
                </div>

                <div className={styles.section}>
                    <h3>{t('social_title')}</h3>
                    <div className={styles.social}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialLink}>
                            <span className={styles.socialIcon}>📘</span>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
                            <span className={styles.socialIcon}>📷</span>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialLink}>
                            <span className={styles.socialIcon}>📺</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>© 2024 Cookly. Kõik õigused kaitstud.</p>
            </div>
        </footer>
    );
}
