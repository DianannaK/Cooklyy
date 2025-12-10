import { Recipe } from '@/types/recipe';

export async function generateRecipe(dishName: string, servings: number): Promise<Recipe> {
    // Simulate AI delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock response based on input
    return {
        categories: [],
        id: Math.random().toString(36).substr(2, 9),
        title: dishName,
        description: `Maitsev ja kodune ${dishName.toLowerCase()}, mis valmib kiirelt ja lihtsalt. Ideaalne roog ${servings} inimesele.`,
        servings: servings,
        ingredients: [
            { name: 'Peamine koostisosa', amount: 500, unit: 'g' },
            { name: 'Köögivili', amount: 200, unit: 'g' },
            { name: 'Maitseained', amount: 1, unit: 'tl' },
            { name: 'Õli', amount: 2, unit: 'sl' },
            { name: 'Vesi', amount: 100, unit: 'ml' }
        ],
        steps: [
            'Valmista ette kõik koostisosad, pese ja puhasta köögiviljad.',
            'Kuumuta pannil õli ja pruunista peamine koostisosa.',
            'Lisa tükeldatud köögiviljad ja kuumuta veel mõned minutid.',
            'Maitsesta soola, pipra ja muude meelepäraste maitseainetega.',
            'Lisa vesi ja hauta kaane all kuni valmimiseni.',
            'Serveeri koheselt koos värske maitserohelisega.'
        ]
    };
}
