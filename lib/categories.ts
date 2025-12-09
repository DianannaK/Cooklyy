export const categories = [
    'Kõik',
    'Vegan',
    'Mereannid',
    'Kiire toit',
    'Magustoidud',
    'Pasta',
    'Linnuliha',
    'Liha',
    'Kala',
    'Salatid',
    'Supp',
    'Tervislik',
    'Eesti köök',
    'Itaalia',
    'Aasia',
    'Ameerika'
] as const;

export type Category = typeof categories[number];
