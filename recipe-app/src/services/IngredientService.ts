import type { Ingredient } from "../data/Ingredient";
import DatabaseService, { ETable } from "./DatabaseService";

class IngredientService {
	private ingredients!: Ingredient[];

	constructor() {
		this.loadIngredients();
	}

	public async loadIngredients() {
		this.ingredients = await DatabaseService.getAll(ETable.INGREDIENT);
	}

	public async addIngredient(text: string) {
		const ingredient: Ingredient = {
			name: text,
			stock: 0,
		};

		const id = await DatabaseService.add(ETable.INGREDIENT, ingredient);

		ingredient.id = id;

		this.ingredients.push(ingredient);
	}

	public getIngredients() {
		return this.ingredients;
	}
}

export default new IngredientService();
