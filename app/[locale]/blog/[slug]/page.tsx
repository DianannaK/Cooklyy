import { useTranslations } from 'next-intl';
import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { use } from 'react';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // We need to use a client component for translations if we want to keep this server side
    // OR we can just pass the category key and handle translation in a small client component
    // But for simplicity, let's just use the key or a simple mapping if tCats is not available on server
    // Actually next-intl works on server components too!
    const tCats = await import('next-intl/server').then(mod => mod.getTranslations('categories'));

    return (
        <article className={styles.article}>
            <div
                className={styles.hero}
                style={{ backgroundImage: `url(${post.coverImage})` }}
            >
                <div className={styles.heroOverlay}>
                    <div className={styles.heroContent}>
                        <span className={styles.category}>{tCats(post.category as any)}</span>
                        <h1 className={styles.title}>{post.title}</h1>
                        <div className={styles.meta}>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div
                    className={styles.body}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </article>
    );
}
