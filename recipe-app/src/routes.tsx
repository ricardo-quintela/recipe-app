import { Home } from "./pages/home";
import { Ingredients } from "./pages/ingredients";
import { Recipes } from "./pages/recipes";
import { ShoppingLists } from "./pages/shopping-lists";

export enum EPage {
    HOME = "HOME",
    RECIPES = "RECIPES",
    INGREDIENTS = "INGREDIENTS",
    SHOPPING_LISTS = "SHOPPING_LISTS",
}

export type TRouteConfig = {
    type: EPage;
    name: string;
    element: React.JSX.Element;
    path: string;
    default?: boolean;
};

export const routes: TRouteConfig[] = [
    { type: EPage.HOME, name: "Home", element: <Home />, path: "/" },
    { type: EPage.RECIPES, name: "Recipes", element: <Recipes />, path: "/recipes" },
    {
        type: EPage.INGREDIENTS,
        name: "Ingredients",
        element: <Ingredients />,
        path: "/ingredients",
    },
    {
        type: EPage.SHOPPING_LISTS,
        name: "Shopping Lists",
        element: <ShoppingLists />,
        path: "/",
    },
];

export const defaultPage = routes[0];
