export interface Ingredient {
    id?: number;
    name: string;
    nameLower: string;
    stock: number;
    category?: string;
    defaultUnit?: string;
}

export type RecipeIngredient = {
    ingredientId: number;
    quantity: number;
    unit: string;
};
