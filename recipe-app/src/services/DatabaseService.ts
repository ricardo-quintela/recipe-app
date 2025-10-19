import type { Table, UpdateSpec } from "dexie";
import type { Ingredient } from "../data/Ingredient";
import type { Recipe } from "../data/Recipe";
import type { ShoppingList } from "../data/ShoppingList";
import Database from "../database/Database";

export enum ETable {
	INGREDIENT = "INGREDIENT",
	RECIPE = "RECIPE",
	SHOPPING_LIST = "SHOPPING_LIST",
}

type TableKey = keyof typeof ETable;

export interface EntityMap {
	INGREDIENT: Ingredient;
	RECIPE: Recipe;
	SHOPPING_LIST: ShoppingList;
}

class DatabaseService {
	private readonly version = 1;
	private readonly database = new Database(this.version);

	private readonly tableMap: {
		[K in TableKey]: Table<EntityMap[K], number>;
	} = {
		INGREDIENT: this.database.ingredients,
		RECIPE: this.database.recipes,
		SHOPPING_LIST: this.database.shoppingLists,
	};

	public add = async <K extends TableKey>(
		table: K,
		data: Omit<EntityMap[K], "id">
	): Promise<number> => {
		const tbl = this.tableMap[table];
		return await tbl.add(data as EntityMap[K]);
	};

	public getAll = async <K extends TableKey>(
		table: K
	): Promise<EntityMap[K][]> => {
		const tbl = this.tableMap[table];
		return await tbl.toArray();
	};

	public getById = async <K extends TableKey>(
		table: K,
		id: number
	): Promise<EntityMap[K] | undefined> => {
		const tbl = this.tableMap[table];
		return await tbl.get(id);
	};

	public update = async <K extends TableKey>(
		table: K,
		id: number,
		changes: UpdateSpec<EntityMap[K]>
	): Promise<number> => {
		const tbl = this.tableMap[table];
		return await tbl.update(id, changes);
	};

	public delete = async <K extends TableKey>(
		table: K,
		id: number
	): Promise<void> => {
		const tbl = this.tableMap[table];
		await tbl.delete(id);
	};
}

export default new DatabaseService();
