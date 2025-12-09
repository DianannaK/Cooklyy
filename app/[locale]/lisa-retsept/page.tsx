'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { generateRecipe } from '@/lib/generateRecipe';
import { Recipe, Ingredient } from '@/types/recipe';
import styles from './page.module.css';

export default function AddRecipePage() {
    const t = useTranslations('nav');
    const [loading, setLoading] = useState(false);
    const [recipe, setRecipe] = useState<Partial<Recipe>>({
        title: '',
        description: '',
        servings: 4,
        ingredients: [],
        steps: []
    });

    async function handleGenerate() {
        if (!recipe.title) return;

        setLoading(true);
        try {
            const generated = await generateRecipe(recipe.title, recipe.servings || 4);
            setRecipe(generated);
        } catch (error) {
            console.error('Error generating recipe:', error);
        } finally {
            setLoading(false);
        }
    }

    function updateIngredient(index: number, field: keyof Ingredient, value: string | number) {
        const newIngredients = [...(recipe.ingredients || [])];
        newIngredients[index] = { ...newIngredients[index], [field]: value };
        setRecipe({ ...recipe, ingredients: newIngredients });
    }

    function addIngredient() {
        setRecipe({
            ...recipe,
            ingredients: [...(recipe.ingredients || []), { name: '', amount: 0, unit: '' }]
        });
    }

    function updateStep(index: number, value: string) {
        const newSteps = [...(recipe.steps || [])];
        newSteps[index] = value;
        setRecipe({ ...recipe, steps: newSteps });
    }

    function addStep() {
        setRecipe({
            ...recipe,
            steps: [...(recipe.steps || []), '']
        });
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t('add_recipe')}</h1>

            <div className={styles.form}>
                <div className={styles.section}>
                    <label className={styles.label}>Retsepti nimi</label>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={recipe.title}
                            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
                            className={styles.input}
                            placeholder="nt. Kartulisalat"
                        />
                        <button
                            onClick={handleGenerate}
                            disabled={loading || !recipe.title}
                            className={styles.generateBtn}
                        >
                            {loading ? 'Genereerin...' : '✨ Genereeri automaatselt'}
                        </button>
                    </div>
                </div>

                <div className={styles.section}>
                    <label className={styles.label}>Kirjeldus</label>
                    <textarea
                        value={recipe.description}
                        onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
                        className={styles.textarea}
                        rows={3}
                    />
                </div>

                <div className={styles.section}>
                    <label className={styles.label}>Kogus (inimest)</label>
                    <input
                        type="number"
                        value={recipe.servings}
                        onChange={(e) => setRecipe({ ...recipe, servings: parseInt(e.target.value) || 0 })}
                        className={styles.input}
                        min="1"
                    />
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <label className={styles.label}>Koostisosad</label>
                        <button onClick={addIngredient} className={styles.addBtn}>+ Lisa koostisosa</button>
                    </div>
                    <div className={styles.list}>
                        {recipe.ingredients?.map((ing, i) => (
                            <div key={i} className={styles.ingredientRow}>
                                <input
                                    type="text"
                                    value={ing.name}
                                    onChange={(e) => updateIngredient(i, 'name', e.target.value)}
                                    placeholder="Nimetus"
                                    className={styles.input}
                                />
                                <input
                                    type="number"
                                    value={ing.amount}
                                    onChange={(e) => updateIngredient(i, 'amount', parseFloat(e.target.value))}
                                    placeholder="Kogus"
                                    className={styles.input}
                                    style={{ width: '100px' }}
                                />
                                <input
                                    type="text"
                                    value={ing.unit}
                                    onChange={(e) => updateIngredient(i, 'unit', e.target.value)}
                                    placeholder="Ühik"
                                    className={styles.input}
                                    style={{ width: '80px' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <label className={styles.label}>Valmistamine</label>
                        <button onClick={addStep} className={styles.addBtn}>+ Lisa samm</button>
                    </div>
                    <div className={styles.list}>
                        {recipe.steps?.map((step, i) => (
                            <div key={i} className={styles.stepRow}>
                                <span className={styles.stepNum}>{i + 1}.</span>
                                <textarea
                                    value={step}
                                    onChange={(e) => updateStep(i, e.target.value)}
                                    className={styles.textarea}
                                    rows={2}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button className={styles.submitBtn}>Salvesta retsept</button>
            </div>
        </div>
    );
}
