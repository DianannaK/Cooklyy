import Link from 'next/link';
import Image from 'next/image';
import { Recipe } from '@/types';
import styles from './RecipeCard.module.css';

interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Link href={`/retseptid/${recipe.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={recipe.image_url || '/images/placeholder-recipe.jpg'}
                    alt={recipe.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.category}>{recipe.category}</div>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{recipe.title}</h3>
                <p className={styles.description}>{recipe.description}</p>

                <div className={styles.meta}>
                    <span className={styles.metaItem}>
                        ⏱️ {recipe.cooking_time} min
                    </span>
                    <span className={styles.metaItem}>
                        👨‍🍳 {recipe.difficulty}
                    </span>
                    <span className={styles.metaItem}>
                        🍽️ {recipe.servings} portsut
                    </span>
                </div>
            </div>
        </Link>
    );
}
