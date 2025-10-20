import AddRecipe from "./pages/add-recipe";
import { Home } from "./pages/home";
import { Ingredients } from "./pages/ingredients";
import { Recipes } from "./pages/recipes";
import { ShoppingLists } from "./pages/shopping-lists";

export enum EPage {
	HOME = "HOME",
	RECIPES = "RECIPES",
	INGREDIENTS = "INGREDIENTS",
	SHOPPING_LISTS = "SHOPPING_LISTS",
	ADD_RECIPE = "ADD_RECIPE",
}

export type TRouteConfig = {
	type: EPage;
	name: string;
	element: React.JSX.Element;
	path: string;
	default?: boolean;
	showInNav?: boolean;
};

export const routes: TRouteConfig[] = [
	{ type: EPage.HOME, name: "Home", element: <Home />, path: "/" },
	{
		type: EPage.RECIPES,
		name: "Recipes",
		element: <Recipes />,
		path: "/recipes",
		showInNav: true,
	},
	{
		type: EPage.ADD_RECIPE,
		name: "New Recipe",
		element: <AddRecipe />,
		path: "/recipes/add-recipe",
	},
	{
		type: EPage.INGREDIENTS,
		name: "Ingredients",
		element: <Ingredients />,
		path: "/ingredients",
		showInNav: true,
	},
	{
		type: EPage.SHOPPING_LISTS,
		name: "Shopping Lists",
		element: <ShoppingLists />,
		path: "/shopping-lists",
		showInNav: true,
	},
];

export const defaultPage = routes[0];
