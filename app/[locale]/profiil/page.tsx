'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { supabase } from '@/lib/supabase';
import { Recipe } from '@/types/recipe';
import { getRecipes } from '@/lib/recipes';
import Link from 'next/link';
import styles from './page.module.css';

export default function ProfilePage() {
    const t = useTranslations('nav');
    const [activeTab, setActiveTab] = useState<'recipes' | 'favorites' | 'shopping'>('recipes');
    const [user, setUser] = useState<any>(null);
    const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
    const [favorites, setFavorites] = useState<Recipe[]>([]);
    const [shoppingList, setShoppingList] = useState<any[]>([]);

    useEffect(() => {
        // Get user
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        // Mock data for now (in real app, fetch from Supabase)
        const allRecipes = getRecipes();
        setMyRecipes(allRecipes.slice(0, 3));
        setFavorites(allRecipes.slice(3, 6));

        const savedList = localStorage.getItem('shoppingList');
        if (savedList) {
            setShoppingList(JSON.parse(savedList));
        }
    }, []);

    const removeFromList = (index: number) => {
        const newList = shoppingList.filter((_, i) => i !== index);
        setShoppingList(newList);
        localStorage.setItem('shoppingList', JSON.stringify(newList));
    };

    if (!user) {
        return (
            <div className={styles.container}>
                <div className={styles.loginPrompt}>
                    <h1>Palun logi sisse</h1>
                    <p>Profiili vaatamiseks pead olema sisse logitud.</p>
                    <Link href="/et/auth/login" className={styles.btnPrimary}>Logi sisse</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.profileInfo}>
                    <div className={styles.avatar}>
                        {user.email?.[0].toUpperCase()}
                    </div>
                    <div>
                        <h1 className={styles.name}>{user.user_metadata?.display_name || user.email}</h1>
                        <p className={styles.email}>{user.email}</p>
                    </div>
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <strong>{myRecipes.length}</strong>
                        <span>Retsepti</span>
                    </div>
                    <div className={styles.stat}>
                        <strong>{favorites.length}</strong>
                        <span>Lemmikut</span>
                    </div>
                </div>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'recipes' ? styles.active : ''}`}
                    onClick={() => setActiveTab('recipes')}
                >
                    Minu retseptid
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'favorites' ? styles.active : ''}`}
                    onClick={() => setActiveTab('favorites')}
                >
                    Lemmikud
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'shopping' ? styles.active : ''}`}
                    onClick={() => setActiveTab('shopping')}
                >
                    Ostunimekiri
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'recipes' && (
                    <div className={styles.grid}>
                        <Link href="/lisa-retsept" className={styles.addCard}>
                            <span>+</span>
                            <p>Lisa uus retsept</p>
                        </Link>
                        {myRecipes.map(recipe => (
                            <Link key={recipe.id} href={`/retseptid/${recipe.id}`} className={styles.card}>
                                <div className={styles.cardContent}>
                                    <h3>{recipe.title}</h3>
                                    <div className={styles.cardActions}>
                                        <button className={styles.editBtn}>Muuda</button>
                                        <button className={styles.deleteBtn}>Kustuta</button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {activeTab === 'favorites' && (
                    <div className={styles.grid}>
                        {favorites.map(recipe => (
                            <Link key={recipe.id} href={`/retseptid/${recipe.id}`} className={styles.card}>
                                <div className={styles.cardContent}>
                                    <h3>{recipe.title}</h3>
                                    <button className={styles.removeBtn}>Eemalda lemmikutest</button>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {activeTab === 'shopping' && (
                    <div className={styles.shoppingList}>
                        {shoppingList.length === 0 ? (
                            <p className={styles.empty}>Ostunimekiri on tühi</p>
                        ) : (
                            shoppingList.map((item, i) => (
                                <div key={i} className={styles.shoppingItem}>
                                    <div className={styles.itemInfo}>
                                        <span className={styles.itemName}>{item.name}</span>
                                        <span className={styles.itemAmount}>{item.amount} {item.unit}</span>
                                    </div>
                                    <button onClick={() => removeFromList(i)} className={styles.removeBtn}>×</button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
