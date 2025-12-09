'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase, isAdmin } from '@/lib/supabase';
import { Recipe } from '@/types';
import styles from './admin.module.css';

export default function AdminPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        checkAdminAccess();
    }, []);

    async function checkAdminAccess() {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push('/auth/login');
            return;
        }

        const adminStatus = await isAdmin(user.id);
        if (!adminStatus) {
            alert('Sul ei ole administraatori õigusi');
            router.push('/');
            return;
        }

        setUser(user);
        fetchPendingRecipes();
    }

    async function fetchPendingRecipes() {
        const { data, error } = await supabase
            .from('recipes')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: false });

        if (data) {
            setRecipes(data);
        }
        setLoading(false);
    }

    async function handleApprove(recipeId: string) {
        const { error } = await supabase
            .from('recipes')
            .update({ status: 'approved' })
            .eq('id', recipeId);

        if (!error) {
            alert('Retsept kinnitatud!');
            fetchPendingRecipes();
            setSelectedRecipe(null);
        }
    }

    async function handleReject(recipeId: string) {
        const { error } = await supabase
            .from('recipes')
            .update({ status: 'rejected' })
            .eq('id', recipeId);

        if (!error) {
            alert('Retsept tagasi lükatud');
            fetchPendingRecipes();
            setSelectedRecipe(null);
        }
    }

    if (loading) {
        return <div className={styles.loading}>Laadimine...</div>;
    }

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <h1>Admin Panel</h1>
                    <p>Kinnita või lükka tagasi ootel retseptid</p>
                </div>

                {recipes.length === 0 ? (
                    <div className={styles.empty}>
                        <p>Ootel retsepte pole</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {recipes.map((recipe) => (
                            <div key={recipe.id} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={recipe.image_url || '/images/placeholder-recipe.jpg'}
                                        alt={recipe.title}
                                        fill
                                        className={styles.image}
                                    />
                                </div>

                                <div className={styles.content}>
                                    <h3>{recipe.title}</h3>
                                    <p>{recipe.description}</p>

                                    <div className={styles.meta}>
                                        <span>{recipe.category}</span>
                                        <span>{recipe.cooking_time} min</span>
                                        <span>{recipe.difficulty}</span>
                                    </div>

                                    <div className={styles.actions}>
                                        <button
                                            onClick={() => setSelectedRecipe(recipe)}
                                            className="btn btn-outline"
                                        >
                                            Vaata
                                        </button>
                                        <button
                                            onClick={() => handleApprove(recipe.id)}
                                            className="btn btn-accent"
                                        >
                                            ✓ Kinnita
                                        </button>
                                        <button
                                            onClick={() => handleReject(recipe.id)}
                                            className={styles.rejectBtn}
                                        >
                                            ✕ Lükka tagasi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Recipe Preview Modal */}
                {selectedRecipe && (
                    <div className={styles.modal} onClick={() => setSelectedRecipe(null)}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.closeBtn} onClick={() => setSelectedRecipe(null)}>
                                ✕
                            </button>

                            <h2>{selectedRecipe.title}</h2>
                            <p>{selectedRecipe.description}</p>

                            <div className={styles.modalSection}>
                                <h3>Koostisosad</h3>
                                <ul>
                                    {selectedRecipe.ingredients.map((ing, idx) => (
                                        <li key={idx}>
                                            {ing.amount} {ing.unit} {ing.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.modalSection}>
                                <h3>Valmistamine</h3>
                                <ol>
                                    {selectedRecipe.instructions.map((step, idx) => (
                                        <li key={idx}>{step}</li>
                                    ))}
                                </ol>
                            </div>

                            <div className={styles.modalActions}>
                                <button
                                    onClick={() => handleApprove(selectedRecipe.id)}
                                    className="btn btn-accent"
                                >
                                    ✓ Kinnita
                                </button>
                                <button
                                    onClick={() => handleReject(selectedRecipe.id)}
                                    className={styles.rejectBtn}
                                >
                                    ✕ Lükka tagasi
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
