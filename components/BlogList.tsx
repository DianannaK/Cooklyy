"use client";
import { useEffect, useState } from "react";
import styles from "./BlogList.module.css";

export default function BlogList() {
    const [posts, setPosts] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);

    useEffect(() => {
        async function load() {
            const results = [];
            for (let i = 1; i <= 50; i++) {
                try {
                    const res = await fetch(`/blog/${i}.json`);
                    if (res.ok) {
                        const data = await res.json();
                        results.push(data);
                    }
                } catch (e) {
                    console.error(`Failed to load post ${i}`, e);
                }
            }
            setPosts(results);
        }
        load();
    }, []);

    return (
        <div className={styles.grid}>
            {posts.map((p) => (
                <div
                    key={p.id}
                    className={styles.card}
                    onClick={() => setSelected(p)}
                >
                    <img src={p.image} alt={p.title_et} />
                    <h3>{p.title_et}</h3>
                </div>
            ))}

            {selected && (
                <div className={styles.modal} onClick={() => setSelected(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <img src={selected.image} alt={selected.title_et} />
                        <h2>{selected.title_et}</h2>
                        <p>{selected.content_et}</p>
                        <button onClick={() => setSelected(null)}>Sulge</button>
                    </div>
                </div>
            )}
        </div>
    );
}
