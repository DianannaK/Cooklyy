'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import styles from './auth.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Sisselogimine ebaõnnestus');
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleSignIn() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/`,
            },
        });
        if (error) setError(error.message);
    }

    async function handleFacebookSignIn() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
                redirectTo: `${window.location.origin}/`,
            },
        });
        if (error) setError(error.message);
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1>Logi sisse</h1>

                    {error && <div className={styles.error}>{error}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="email">E-post</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="sinu@email.ee"
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="password">Parool</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        <button type="submit" className={styles.btnPrimary} disabled={loading}>
                            {loading ? 'Sisselogimine...' : 'Logi sisse'}
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>või</span>
                    </div>

                    <div className={styles.socialButtons}>
                        <button onClick={handleGoogleSignIn} className={styles.btnGoogle}>
                            <Image src="/icons/google.png" alt="Google" width={20} height={20} className={styles.socialIcon} />
                            Jätka Google'iga
                        </button>
                        <button onClick={handleFacebookSignIn} className={styles.btnFacebook}>
                            <Image src="/icons/facebook.png" alt="Facebook" width={20} height={20} className={styles.socialIcon} />
                            Jätka Facebookiga
                        </button>
                    </div>

                    <p className={styles.footer}>
                        Pole veel kontot?{' '}
                        <Link href="/auth/register">Registreeru siin</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
