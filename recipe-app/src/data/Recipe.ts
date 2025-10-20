import type { RecipeIngredient } from "./Ingredient";

export interface Recipe {
    id?: number;
    name: string;
    nameLower: string;
    description: string;
    ingredients: RecipeIngredient[];
    instructions?: string;
    createdAt: Date;
}
