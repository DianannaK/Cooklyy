'use client';

import { useState, useEffect } from 'react';
import styles from './ShoppingList.module.css';

interface ShoppingItem {
    name: string;
    amount: number;
    unit: string;
}

export default function ShoppingList() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<ShoppingItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('shoppingList');
        if (saved) {
            setItems(JSON.parse(saved));
        }
    }, []);

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        localStorage.setItem('shoppingList', JSON.stringify(newItems));
    };

    const copyToClipboard = () => {
        const text = items.map(i => `- ${i.name}: ${i.amount} ${i.unit}`).join('\n');
        navigator.clipboard.writeText(text);
        alert('Ostunimekiri kopeeritud!');
    };

    if (!isOpen) {
        return (
            <button className={styles.floatBtn} onClick={() => setIsOpen(true)}>
                🛒 <span className={styles.badge}>{items.length}</span>
            </button>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Ostunimekiri</h3>
                <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>✕</button>
            </div>

            <div className={styles.list}>
                {items.length === 0 ? (
                    <p className={styles.empty}>Nimekiri on tühi</p>
                ) : (
                    items.map((item, i) => (
                        <div key={i} className={styles.item}>
                            <span>{item.name}</span>
                            <span className={styles.amount}>{item.amount} {item.unit}</span>
                            <button onClick={() => removeItem(i)} className={styles.removeBtn}>×</button>
                        </div>
                    ))
                )}
            </div>

            {items.length > 0 && (
                <button onClick={copyToClipboard} className={styles.copyBtn}>
                    Kopeeri nimekiri
                </button>
            )}
        </div>
    );
}
