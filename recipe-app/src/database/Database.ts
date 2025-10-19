import Dexie, { type Table } from "dexie";
import type { Ingredient } from "../data/Ingredient";
import type { Recipe } from "../data/Recipe";
import type { ShoppingList } from "../data/ShoppingList";

export default class Database extends Dexie {
	ingredients!: Table<Ingredient, number>;
	recipes!: Table<Recipe, number>;
	shoppingLists!: Table<ShoppingList, number>;

	constructor(version: number) {
		super("database");
		this.version(version).stores({
			ingredients: "++id, name, category",
			recipes: "++id, name, createdAt",
            shoppingLists: "++id, name, createdAt"
		});
	}
}
