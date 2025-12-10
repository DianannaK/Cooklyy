export interface Ingredient {
    name: string;
    amount: number;
    unit: string;
}

export interface Recipe {
    id: string;
    title: string;
    description: string;
    servings: number;
    ingredients: Ingredient[];
    steps: string[];
    categories: string[];
    prepTime?: number;
    calories?: number;
    macros?: {
        protein: number;
        carbs: number;
        fat: number;
    };
}
