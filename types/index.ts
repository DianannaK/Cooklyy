// TypeScript interfaces for Cookly

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image_url: string;
  ingredients: Ingredient[];
  instructions: string[];
  servings: number;
  category: string;
  cooking_time: number;
  difficulty: 'Lihtne' | 'Keskmine' | 'Keeruline';
  author_id: string;
  author_name?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  display_name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
}

export interface ShoppingCartItem {
  recipe: Recipe;
  servings: number;
}
