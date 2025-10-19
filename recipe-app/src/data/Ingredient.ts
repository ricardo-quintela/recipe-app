export type Ingredient = {
    id?: number;
    name: string;
    category?: string;
    defaultUnit?: string;
}

export type RecipeIngredient = {
    ingredientId: number;
    quantity: number;
    unit: string;
}
