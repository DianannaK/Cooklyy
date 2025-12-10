import { BlogPost } from '@/types/blog';
import { Category } from '@/lib/categories';

// Image mappings for categories (High quality Unsplash images)
// Using the same high-quality images as recipes for consistency and visual appeal
const CATEGORY_IMAGES: Record<string, string[]> = {
    'Vegan': [
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&w=800&q=80'
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

const AUTHORS = [
    'Mari Mets', 'Jaan Tamm', 'Liis Kask', 'Peeter Paju', 'Kati Karu',
    'Andres Sepp', 'Tiina Toom', 'Marko Mägi', 'Laura Lepp', 'Siim Saar'
];

const TITLES = [
    'Kuidas valmistada täiuslikku',
    'Salajane nipp, mis muudab',
    '5 põhjust, miks peaksid sööma rohkem',
    'Parim viis nautida',
    'Ajalooline vaade:',
    'Minu vanaema retsept:',
    'Tervislik alternatiiv:',
    'Kiire ja maitsev:',
    'Restoranikvaliteediga',
    'Algaja juhend:'
];

const INTROS = [
    'Tere tulemast tagasi meie toidublogisse! Täna räägime millestki erilisest.',
    'Kas oled kunagi mõelnud, kuidas profikokad seda teevad? Täna avaldame saladuse.',
    'Toit on midagi enamat kui lihtsalt kütus – see on elamus. Ja see roog on tõeline elamus.',
    'Sügisõhtud on ideaalsed katsetamiseks uute maitsetega. Siin on üks meie lemmikuid.',
    'Tervislik toitumine ei pea olema igav. See retsept tõestab seda ilmekalt.'
];

const BODY_PARAGRAPHS = [
    'Esiteks on oluline valida õiged toorained. Värske ja kvaliteetne tooraine on pool võitu. Külasta kohalikku turgu või vali poes hoolikalt.',
    'Valmistamisprotsess on tegelikult lihtsam kui arvatakse. Tuleb vaid jälgida temperatuure ja mitte kiirustada. Hea toit vajab aega ja armastust.',
    'Maitsestamine on kunst. Ära karda eksperimenteerida ürtide ja vürtsidega. Vahel võib väike muutus tuua kaasa suure üllatuse.',
    'Serveerimine on samuti tähtis. "Süüakse silmadega" ei ole lihtsalt sõnakõlks. Kaunis taldrik teeb toidu veelgi maitsvamaks.',
    'See roog sobib suurepäraselt nii argipäeva õhtusöögiks kui ka pidulauale. Sõbrad ja pere on kindlasti vaimustuses.',
    'Ära unusta, et kokkamine peaks olema nauding, mitte kohustus. Pane mängima oma lemmikmuusika ja naudi protsessi.'
];

const CONCLUSIONS = [
    'Loodame, et said siit inspiratsiooni. Head katsetamist!',
    'Jaga meiega oma tulemusi sotsiaalmeedias. Ootame põnevusega!',
    'Järgmise korrani! Seniks aga – maitsvaid elamusi!',
    'Kui sul tekkis küsimusi, jäta need kommentaaridesse. Aitame rõõmuga.',
    'Head isu ja kohtumiseni uues postituses!'
];

function generateSlug(title: string): string {
    return title.toLowerCase()
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/õ/g, 'o')
        .replace(/ü/g, 'u')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-') + '-' + Math.floor(Math.random() * 1000);
}

    const intro = INTROS[Math.floor(Math.random() * INTROS.length)];
    const body1 = BODY_PARAGRAPHS[Math.floor(Math.random() * BODY_PARAGRAPHS.length)];
    const body2 = BODY_PARAGRAPHS[Math.floor(Math.random() * BODY_PARAGRAPHS.length)];
    const body3 = BODY_PARAGRAPHS[Math.floor(Math.random() * BODY_PARAGRAPHS.length)];
    const conclusion = CONCLUSIONS[Math.floor(Math.random() * CONCLUSIONS.length)];

    return `${intro}\n\n${body1}\n\n${category} on teema, mis pakub lõputult avastamisrõõmu. ${body2}\n\n${body3}\n\n${conclusion}`;
const ALL_POSTS: BlogPost[] = [];
const categoriesList = Object.keys(CATEGORY_IMAGES);
let idCounter = 1;

// Generate 50 posts
for (let i = 0; i < 50; i++) {
    const category = categoriesList[i % categoriesList.length];
    const images = CATEGORY_IMAGES[category];
    const image = images[Math.floor(Math.random() * images.length)];
    const author = AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
    const titleTemplate = TITLES[Math.floor(Math.random() * TITLES.length)];
    const title = `${titleTemplate} ${category.toLowerCase()}`;

    const content = "";

    ALL_POSTS.push({ id: idCounter.toString(), title: "", slug: idCounter.toString(), content: content, image: "",
        id: idCounter.toString(),
        content: content,
    });
    idCounter++;
}

export function getBlogPosts(): BlogPost[] {
    return ALL_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return ALL_POSTS.find(post => post.slug === slug);
}
