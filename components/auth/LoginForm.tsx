'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import { signInWithGoogle, signInWithFacebook } from '@/lib/auth';
import styles from './Auth.module.css';

export default function LoginForm() {
    const t = useTranslations('auth');
    const { setModalView, closeModal } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            closeModal();
        }
    };

    const handleOAuth = async (provider: 'google' | 'facebook') => {
        try {
            if (provider === 'google') {
                await signInWithGoogle();
            } else {
                await signInWithFacebook();
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>{t('login')}</h2>

            <div className={styles.oauthButtons}>
                <button
                    onClick={() => handleOAuth('google')}
                    className={`${styles.oauthBtn} ${styles.google}`}
                >
                    <span className={styles.icon}>G</span> {t('continue_google')}
                </button>
                <button
                    onClick={() => handleOAuth('facebook')}
                    className={`${styles.oauthBtn} ${styles.facebook}`}
                >
                    <span className={styles.icon}>f</span> {t('continue_facebook')}
                </button>
            </div>

            <div className={styles.divider}>
                <span>{t('or')}</span>
            </div>

            <form onSubmit={handleLogin} className={styles.form}>
                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.inputGroup}>
                    <label>{t('email')}</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>{t('password')}</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <button
                        type="button"
                        onClick={() => setModalView('reset')}
                        className={styles.forgotLink}
                    >
                        {t('forgot_password')}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={styles.submitBtn}
                >
                    {loading ? '...' : t('login')}
                </button>
            </form>

            <div className={styles.footer}>
                {t('no_account')} {' '}
                <button
                    onClick={() => setModalView('register')}
                    className={styles.linkBtn}
                >
                    {t('create_account')}
                </button>
            </div>
        </div>
    );
}
