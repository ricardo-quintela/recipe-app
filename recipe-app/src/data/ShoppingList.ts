export interface ShoppingList {
    id?: number;
    name?: string;
    nameLower: string;
    createdAt: Date;
    items: ShoppingItem[];
}

export type ShoppingItem = {
    ingredientId: number;
    quantity: number;
    isBought: boolean;
};
