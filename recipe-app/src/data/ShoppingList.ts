export type ShoppingList = {
    id?: number;
    name?: string;
    createdAt: Date;
    items: ShoppingItem[];
}

export type ShoppingItem = {
    ingredientId: number;
    quantity: number;
    isBought: boolean;
}