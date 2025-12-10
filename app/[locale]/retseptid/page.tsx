'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { getRecipes } from '@/lib/recipes';
import { categories } from '@/lib/categories';
import styles from './page.module.css';

export default function RecipesPage() {
    const t = useTranslations('nav');
    const tCats = useTranslations('categories');
    const searchParams = useSearchParams();
    const allRecipes = getRecipes();

    const [selectedCats, setSelectedCats] = useState<string[]>([]);

    // Initialize from URL
    useEffect(() => {
        const catParam = searchParams.get('cat');
        if (catParam) {
            setSelectedCats([catParam]);
        }
    }, [searchParams]);

    const toggleCategory = (cat: string) => {
        if (selectedCats.includes(cat)) {
            setSelectedCats(selectedCats.filter(c => c !== cat));
        } else {
            setSelectedCats([...selectedCats, cat]);
        }
    };

    const filteredRecipes = useMemo(() => {
        if (selectedCats.length === 0) return allRecipes;
        return allRecipes.filter(recipe =>
            selectedCats.every(cat => recipe.categories.includes(cat))
        );
    }, [allRecipes, selectedCats]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t('recipes')}</h1>

            {/* Filter Bar */}
            <div className={styles.filterBar}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`${styles.filterPill} ${cat === 'Kõik'
                                ? selectedCats.length === 0 ? styles.active : ''
                                : selectedCats.includes(cat) ? styles.active : ''
                            }`}
                        onClick={() => cat === 'Kõik' ? setSelectedCats([]) : toggleCategory(cat)}
                    >
                        {tCats(cat as any)}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredRecipes.map((recipe) => (
                    <Link key={recipe.id} href={`retseptid/${recipe.id}`} className={styles.card}>
                        <div
                            className={styles.image}
                        />
                        <div className={styles.content}>
                            <div className={styles.cardTags}>
                                {recipe.categories.slice(0, 2).map(cat => (
                                    <span key={cat} className={styles.tag}>{tCats(cat as any)}</span>
                                ))}
                            </div>
                            <h2 className={styles.cardTitle}>{recipe.title}</h2>
                            <p className={styles.description}>{recipe.description}</p>
                            <div className={styles.meta}>
                                <span>👤 {recipe.servings}</span>
                                <span>⏱️ 30 min</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
