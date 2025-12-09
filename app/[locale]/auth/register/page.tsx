'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import styles from './auth.module.css';

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Paroolid ei ühti');
            return;
        }

        if (!agreedToTerms) {
            setError('Palun nõustu kasutustingimustega');
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        display_name: firstName,
                    },
                },
            });

            if (error) throw error;

            // Create user profile
            if (data.user) {
                await supabase.from('user_profiles').insert({
                    id: data.user.id,
                    display_name: firstName,
                    is_admin: false,
                });
            }

            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Registreerimine ebaõnnestus');
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
                    <h1>Loo oma Cookly konto</h1>

                    {error && <div className={styles.error}>{error}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="firstName">Eesnimi</label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                placeholder="Sinu nimi"
                            />
                        </div>

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
                                minLength={6}
                                placeholder="Vähemalt 6 tähemärki"
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="confirmPassword">Korda parooli</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                                placeholder="Sisesta parool uuesti"
                            />
                        </div>

                        <div className={styles.checkbox}>
                            <input
                                id="terms"
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                            />
                            <label htmlFor="terms">
                                Nõustun kasutustingimuste ja privaatsuspoliitikaga
                            </label>
                        </div>

                        <button type="submit" className={styles.btnPrimary} disabled={loading}>
                            {loading ? 'Registreerimine...' : 'Loo konto'}
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
                        On sul juba konto?{' '}
                        <Link href="/auth/login">Logi sisse</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
