import type { RecipeIngredient } from "./Ingredient";

export type Recipe = {
    id?: number;
    name: string;
    description: string;
    ingredients: RecipeIngredient[];
    instructions?: string;
    createdAt: Date;
}