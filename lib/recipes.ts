import { Recipe } from '@/types/recipe';
import { Category } from './categories';

// Image mappings for categories (High quality Unsplash images)
const CATEGORY_IMAGES: Record<string, string[]> = {
    'Vegan': [
        '/recipes/vegan_1.png',
        '/recipes/vegan_2.png',
        '/recipes/vegan_3.png'
    ],
    'Mereannid': [
        'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1615141982880-1313d06a7d87?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=800&q=80'
    ],
    'Kiire toit': [
        'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'
    ],
    'Magustoidud': [
        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80'
    ],
    'Pasta': [
        'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1608835291093-394b0c943a75?auto=format&fit=crop&w=800&q=80'
    ],
    'Linnuliha': [
        'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80'
    ],
    'Liha': [
        'https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
    ],
    'Kala': [
        'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1535568432903-c841cbb1f6bc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&w=800&q=80'
    ],
    'Salatid': [
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    ],
    'Supp': [
        'https://images.unsplash.com/photo-1547592166-23acbe34001e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80'
    ],
    'Tervislik': [
        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'
    ],
    'Eesti köök': [
        'https://images.unsplash.com/photo-1600289031464-74d374b64991?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80'
    ],
    'Itaalia': [
        'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1574868233972-1e683d4b31ea?auto=format&fit=crop&w=800&q=80'
    ],
    'Aasia': [
        'https://images.unsplash.com/photo-1564436872-f6d81182df12?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80'
    ],
    'Ameerika': [
        'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1527324688151-0e627063f2b1?auto=format&fit=crop&w=800&q=80'
    ]
};

// Estonian text templates
const ADJECTIVES = ['Mahlane', 'Krõbe', 'Vürtsikas', 'Kreemjas', 'Värske', 'Kodune', 'Ahjusoe', 'Kuldne', 'Suvine', 'Talvine', 'Kerge', 'Toitev', 'Luksuslik', 'Lihtne', 'Kiire', 'Aromaatne', 'Rikkalik'];
const NOUNS = ['Kana', 'Pasta', 'Salat', 'Supp', 'Kook', 'Praad', 'Hautis', 'Vormiroog', 'Karri', 'Burger', 'Pitsa', 'Smuuti', 'Omlett', 'Riisiroog', 'Kala', 'Wok', 'Puder', 'Pirukas'];

const INGREDIENTS_BASE = [
    { name: 'Sool', unit: 'tl' },
    { name: 'Pipar', unit: 'näpuotsatäis' },
    { name: 'Oliiviõli', unit: 'sl' },
    { name: 'Või', unit: 'g' },
    { name: 'Sibul', unit: 'tk' },
    { name: 'Küüslauk', unit: 'küünt' },
    { name: 'Vesi', unit: 'ml' }
];

const CATEGORY_INGREDIENTS: Record<string, { name: string, unit: string }[]> = {
    'Vegan': [{ name: 'Tofu', unit: 'g' }, { name: 'Kikerherned', unit: 'g' }, { name: 'Kinoa', unit: 'g' }, { name: 'Avokaado', unit: 'tk' }, { name: 'Kookospiim', unit: 'ml' }],
    'Mereannid': [{ name: 'Krevetid', unit: 'g' }, { name: 'Lõhefilee', unit: 'g' }, { name: 'Sinimerekarbid', unit: 'g' }, { name: 'Kalmaar', unit: 'g' }],
    'Kiire toit': [{ name: 'Friikartulid', unit: 'g' }, { name: 'Burgerikukkel', unit: 'tk' }, { name: 'Ketšup', unit: 'sl' }, { name: 'Viinerid', unit: 'tk' }],
    'Magustoidud': [{ name: 'Suhkur', unit: 'g' }, { name: 'Jahu', unit: 'g' }, { name: 'Munad', unit: 'tk' }, { name: 'Šokolaad', unit: 'g' }, { name: 'Vahukoor', unit: 'ml' }],
    'Pasta': [{ name: 'Spagetid', unit: 'g' }, { name: 'Penne', unit: 'g' }, { name: 'Parmesan', unit: 'g' }, { name: 'Tomatikaste', unit: 'g' }, { name: 'Basiilik', unit: 'kimpu' }],
    'Linnuliha': [{ name: 'Kanafilee', unit: 'g' }, { name: 'Kanakoivad', unit: 'tk' }, { name: 'Kalkunifilee', unit: 'g' }, { name: 'Broiler', unit: 'tk' }],
    'Liha': [{ name: 'Veisehakkliha', unit: 'g' }, { name: 'Sealiha', unit: 'g' }, { name: 'Peekon', unit: 'viilu' }, { name: 'Ribid', unit: 'kg' }],
    'Kala': [{ name: 'Forellifilee', unit: 'g' }, { name: 'Valge kala', unit: 'g' }, { name: 'Sidrun', unit: 'tk' }, { name: 'Till', unit: 'kimpu' }],
    'Salatid': [{ name: 'Jääsalat', unit: 'pea' }, { name: 'Kurk', unit: 'tk' }, { name: 'Tomat', unit: 'tk' }, { name: 'Paprika', unit: 'tk' }, { name: 'Rukola', unit: 'peotäis' }],
    'Supp': [{ name: 'Puljong', unit: 'l' }, { name: 'Kartul', unit: 'tk' }, { name: 'Porgand', unit: 'tk' }, { name: 'Nuudlid', unit: 'g' }],
    'Tervislik': [{ name: 'Brokoli', unit: 'g' }, { name: 'Lillkapsas', unit: 'g' }, { name: 'Pähklid', unit: 'g' }, { name: 'Spinat', unit: 'g' }],
    'Eesti köök': [{ name: 'Kartul', unit: 'kg' }, { name: 'Hapukoor', unit: 'g' }, { name: 'Must leib', unit: 'viilu' }, { name: 'Seapraad', unit: 'g' }, { name: 'Kama', unit: 'sl' }],
    'Itaalia': [{ name: 'Mozzarella', unit: 'g' }, { name: 'Basiilik', unit: 'kimpu' }, { name: 'Oliiviõli', unit: 'sl' }, { name: 'Prosciutto', unit: 'g' }, { name: 'Pesto', unit: 'sl' }],
    'Aasia': [{ name: 'Sojakaste', unit: 'sl' }, { name: 'Ingver', unit: 'cm' }, { name: 'Riisinuudlid', unit: 'g' }, { name: 'Kookospiim', unit: 'ml' }, { name: 'Tšilli', unit: 'tk' }],
    'Ameerika': [{ name: 'BBQ kaste', unit: 'sl' }, { name: 'Veisepihv', unit: 'tk' }, { name: 'Cheddar juust', unit: 'viilu' }, { name: 'Peekon', unit: 'viilu' }]
};

const STEPS_TEMPLATES = [
    'Haki kõik köögiviljad peeneks ja pane kõrvale.',
    'Kuumuta pannil õli ja prae sibul klaasjaks.',
    'Lisa peamine koostisosa ja pruunista kergelt.',
    'Sega hulka maitseained ja kuumuta veel paar minutit.',
    'Vala peale vedelik ja lase madalal kuumusel haududa.',
    'Maitsesta soola ja pipraga vastavalt soovile.',
    'Serveeri koheselt koos värske lisandiga.',
    'Kaunista maitserohelisega ja naudi!'
];

// Description parts for natural language generation
const DESC_OPENERS = [
    'See hõrk roog on tõeline maitseelamus, mis',
    'Valmista see suurepärane toit, mis',
    'See klassikaline retsept',
    'Naudi seda tervislikku ja toitvat rooga, mis',
    'See lihtne, kuid maitseküllane toit',
    'Avasta uued maitsed selle roaga, mis',
    'See kodune ja soojendav toit',
    'See värske ja kerge eine'
];

const DESC_MIDDLES = [
    'ühendab endas parimad maitsed ja',
    'toob esile koostisosade loomuliku värskuse ning',
    'valmib kiiresti ja lihtsalt, ning',
    'sobib ideaalselt nii argipäevaks kui pidulauale ja',
    'on valmistatud vaid kvaliteetsetest toorainetest ning',
    'pakub tasakaalustatud maitsebuketti ja',
    'on täis vitamiine ja kasulikke toitaineid ning'
];

const DESC_CLOSERS = [
    'viib keele alla.',
    'rõõmustab kindlasti kogu peret.',
    'sobib suurepäraselt tervislikuks õhtusöögiks.',
    'jätab kustumatu mulje igale külalisele.',
    'muudab iga toidukorra eriliseks sündmuseks.',
    'on kindla peale minek igal ajal.',
    'pakub soojust ja hubasust igasse päeva.'
];

function generateTitle(category: string): string {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];

    // Short titles: 1-3 words
    const patterns = [
        `${noun}`,
        `${adj} ${noun}`,
        `${noun} ${category} moodi`
    ];

    return patterns[Math.floor(Math.random() * patterns.length)];
}

function generateDescription(category: string, mainIngredient: string): string {
    const opener = DESC_OPENERS[Math.floor(Math.random() * DESC_OPENERS.length)];
    const middle = DESC_MIDDLES[Math.floor(Math.random() * DESC_MIDDLES.length)];
    const closer = DESC_CLOSERS[Math.floor(Math.random() * DESC_CLOSERS.length)];

    // Add specific detail about the main ingredient
    const detail = `Peamiseks staariks on siin ${mainIngredient.toLowerCase()}, mis annab roale iseloomuliku tekstuuri.`;

    return `${opener} ${middle} ${closer} ${detail}`;
}

function generateIngredients(category: string) {
    const base = [...INGREDIENTS_BASE];
    const specific = CATEGORY_INGREDIENTS[category] || [];
    const combined = [...base.slice(0, 3), ...specific];

    // Pick 5-8 random ingredients
    const count = 5 + Math.floor(Math.random() * 4);
    const selected = [];

    for (let i = 0; i < count; i++) {
        if (combined.length === 0) break;
        const index = Math.floor(Math.random() * combined.length);
        const ing = combined.splice(index, 1)[0];
        selected.push({
            name: ing.name,
            amount: Math.floor(Math.random() * 500) + 1,
            unit: ing.unit
        });
    }

    return selected;
}

function generateSteps(category: string): string[] {
    // Always 6-8 steps
    const count = 6 + Math.floor(Math.random() * 3);
    const steps = [...STEPS_TEMPLATES];
    const result = [];

    // Add specific start step
    result.push(`Valmista ette kõik ${category.toLowerCase()} toidu koostisosad.`);

    for (let i = 0; i < count - 2; i++) {
        const index = Math.floor(Math.random() * steps.length);
        result.push(steps[index]);
    }

    // Add specific end step
    result.push('Lase toidul veidi jahtuda ja serveeri.');

    return result;
}

// Generate 500 recipes
const ALL_RECIPES: Recipe[] = [];
const RECIPES_PER_CATEGORY = Math.ceil(500 / 15); // ~34 per category (excluding 'Kõik')

const categoriesList = Object.keys(CATEGORY_IMAGES);

let idCounter = 1;

categoriesList.forEach(category => {
    for (let i = 0; i < RECIPES_PER_CATEGORY; i++) {
        if (ALL_RECIPES.length >= 500) break;

        const images = CATEGORY_IMAGES[category];
        const image = images[Math.floor(Math.random() * images.length)];
        const ingredients = generateIngredients(category);
        // Find a main ingredient for the description
        const mainIng = ingredients.find(i => !['Sool', 'Pipar', 'Oliiviõli', 'Vesi'].includes(i.name))?.name || 'koostisosa';

        ALL_RECIPES.push({
            id: idCounter.toString(),
            title: generateTitle(category),
            description: generateDescription(category, mainIng),
            servings: 4,
            prepTime: 15 + Math.floor(Math.random() * 45),
            calories: 200 + Math.floor(Math.random() * 600),
            macros: {
                protein: 10 + Math.floor(Math.random() * 40),
                carbs: 20 + Math.floor(Math.random() * 60),
                fat: 5 + Math.floor(Math.random() * 30)
            },
            imageUrl: image,
            categories: [category as Category],
            ingredients: ingredients,
            steps: generateSteps(category)
        });
        idCounter++;
    }
});

export function getRecipes(category?: string): Recipe[] {
    if (!category || category === 'Kõik') {
        return ALL_RECIPES;
    }
    return ALL_RECIPES.filter(recipe => recipe.categories?.includes(category as Category));
}

export function getRecipeById(id: string): Recipe | undefined {
    return ALL_RECIPES.find(recipe => recipe.id === id);
}
