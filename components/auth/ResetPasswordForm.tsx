'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import styles from './Auth.module.css';

export default function ResetPasswordForm() {
    const t = useTranslations('auth');
    const { setModalView } = useAuth();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/update-password`,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage(t('reset_sent'));
        }
        setLoading(false);
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>{t('reset_password')}</h2>

            <form onSubmit={handleReset} className={styles.form}>
                {error && <div className={styles.error}>{error}</div>}
                {message && <div className={styles.success}>{message}</div>}

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

                <button
                    type="submit"
                    disabled={loading}
                    className={styles.submitBtn}
                >
                    {loading ? '...' : t('send_reset_link')}
                </button>
            </form>

            <div className={styles.footer}>
                <button
                    onClick={() => setModalView('login')}
                    className={styles.linkBtn}
                >
                    &larr; {t('login')}
                </button>
            </div>
        </div>
    );
}
