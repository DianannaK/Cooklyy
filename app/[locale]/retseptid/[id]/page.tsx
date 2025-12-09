'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getRecipeById } from '@/lib/recipes';
import { Recipe } from '@/types/recipe';
import { notFound } from 'next/navigation';
import jsPDF from 'jspdf';
import ShoppingList from '@/components/ShoppingList';
import { useToast } from '@/components/Toast';
import styles from './page.module.css';

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const tCats = useTranslations('categories');
    const tToast = useTranslations('toast');
    const { showToast } = useToast();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [servings, setServings] = useState(4);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        params.then(({ id }) => {
            const foundRecipe = getRecipeById(id);
            if (foundRecipe) {
                setRecipe(foundRecipe);
                setServings(foundRecipe.servings);
            }
            setLoading(false);
        });
    }, [params]);

    if (!loading && !recipe) {
        notFound();
    }

    if (loading || !recipe) {
        return <div className={styles.loading}>Laen retsepti...</div>;
    }

    const ratio = servings / recipe.servings;

    const addToShoppingList = () => {
        const currentList = JSON.parse(localStorage.getItem('shoppingList') || '[]');
        const newItems = recipe.ingredients.map(ing => ({
            name: ing.name,
            amount: parseFloat((ing.amount * ratio).toFixed(1)),
            unit: ing.unit
        }));

        localStorage.setItem('shoppingList', JSON.stringify([...currentList, ...newItems]));
        showToast(tToast('added_to_list'), 'success');
        // Trigger storage event for ShoppingList component update
        window.dispatchEvent(new Event('storage'));
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.text(recipe.title, 20, 20);

        doc.setFontSize(12);
        doc.text(`Kogus: ${servings} inimest`, 20, 35);
        doc.text(`Valmistusaeg: ${recipe.prepTime || 30} min`, 20, 42);

        doc.setFontSize(16);
        doc.text('Koostisosad:', 20, 55);

        doc.setFontSize(12);
        let y = 65;
        recipe.ingredients.forEach(ing => {
            doc.text(`• ${ing.name}: ${(ing.amount * ratio).toFixed(1)} ${ing.unit}`, 25, y);
            y += 7;
        });

        y += 10;
        doc.setFontSize(16);
        doc.text('Valmistamine:', 20, y);

        y += 10;
        doc.setFontSize(12);
        recipe.steps.forEach((step, i) => {
            const lines = doc.splitTextToSize(`${i + 1}. ${step}`, 170);
            doc.text(lines, 25, y);
            y += lines.length * 7 + 3;
        });

        doc.save(`${recipe.title.replace(/\s+/g, '_')}.pdf`);
        showToast(tToast('pdf_downloaded'), 'success');
    };

    return (
        <div className={styles.container}>
            <ShoppingList />

            <div
                className={styles.hero}
                style={{ backgroundImage: `url(${recipe.imageUrl})` }}
            >
                <div className={styles.heroOverlay}>
                    <div className={styles.tags}>
                        {recipe.categories?.map(cat => (
                            <span key={cat} className={styles.tag}>{tCats(cat as any)}</span>
                        ))}
                    </div>
                    <h1 className={styles.title}>{recipe.title}</h1>

                    {recipe.prepTime && (
                        <div className={styles.heroMeta}>
                            <span>⏱️ {recipe.prepTime} min</span>
                            <span>🔥 {recipe.calories} kcal</span>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.main}>
                    <p className={styles.description}>{recipe.description}</p>

                    <div className={styles.actions}>
                        <button onClick={downloadPDF} className={styles.actionBtn}>
                            📄 Lae alla PDF
                        </button>
                        <button onClick={addToShoppingList} className={styles.actionBtnSecondary}>
                            🛒 Lisa ostunimekirja
                        </button>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Valmistamine</h2>
                        <div className={styles.steps}>
                            {recipe.steps.map((step, index) => (
                                <div key={index} className={styles.step}>
                                    <span className={styles.stepNumber}>{index + 1}</span>
                                    <p>{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.ingredientsCard}>
                        <h3 className={styles.cardTitle}>Koostisosad</h3>

                        <div className={styles.servingsControl}>
                            <span>Kogus:</span>
                            <div className={styles.controls}>
                                <button
                                    onClick={() => setServings(Math.max(1, servings - 1))}
                                    className={styles.controlBtn}
                                >
                                    -
                                </button>
                                <span className={styles.servingsValue}>{servings} inimest</span>
                                <button
                                    onClick={() => setServings(servings + 1)}
                                    className={styles.controlBtn}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <ul className={styles.ingredientsList}>
                            {recipe.ingredients.map((ing, index) => (
                                <li key={index} className={styles.ingredient}>
                                    <span className={styles.ingName}>{ing.name}</span>
                                    <span className={styles.ingAmount}>
                                        {(ing.amount * ratio).toFixed(1).replace(/\.0$/, '')} {ing.unit}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {recipe.macros && (
                            <div className={styles.macros}>
                                <div className={styles.macro}>
                                    <span>Valk</span>
                                    <strong>{recipe.macros.protein}g</strong>
                                </div>
                                <div className={styles.macro}>
                                    <span>Süsivesik</span>
                                    <strong>{recipe.macros.carbs}g</strong>
                                </div>
                                <div className={styles.macro}>
                                    <span>Rasv</span>
                                    <strong>{recipe.macros.fat}g</strong>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
