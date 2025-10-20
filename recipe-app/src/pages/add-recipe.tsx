import dayjs from "dayjs";
import { useRef, useState, type FormEvent } from "react";
import {
    Button,
    ButtonGroup,
    CloseButton,
    Container,
    Dropdown,
    Form,
    ListGroup,
    Stack,
} from "react-bootstrap";
import {
    SearchInput,
    type SearchInputHandler,
} from "../components/form/search-form/SearchInput";
import type { Ingredient, RecipeIngredient } from "../data/Ingredient";
import type { Recipe } from "../data/Recipe";
import DatabaseService from "../services/DatabaseService";
import { Constants } from "../utils/Constants";
import { UnitSelect } from "../components/form/unit-select/UnitSelect";

export default function AddRecipe() {
    const [addedIngredients, setAddedIngredients] = useState<
        Map<number, RecipeIngredient & { name: string }>
    >(new Map());
    const [fetchedIngredients, setFetchedIngredients] = useState<Ingredient[]>(
        []
    );
    const formRef = useRef<HTMLFormElement>(null);
    const searchItemRef = useRef<SearchInputHandler>(null);

    async function searchIngredient(term: string) {
        const trimmed = term.toLowerCase().trim();

        if (trimmed === "") {
            setFetchedIngredients([]);
            return false;
        }

        const results = await DatabaseService.database.ingredients
            .where("nameLower")
            .startsWith(trimmed)
            .toArray();

        setFetchedIngredients(results);

        return results.length > 0;
    }

    function removeIngredient(id: number) {
        console.log(id, addedIngredients);
        const updated = new Map(addedIngredients);
        if (!updated.delete(id)) return;

        setAddedIngredients(updated);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!formRef.current) return;

        const data = new FormData(formRef.current);

        const name = data.get("name")?.toString();
        const description = data.get("description")?.toString();
        const instructions = data.get("instructions")?.toString();
        const ingredients = Array.from(addedIngredients.values());
        const createdAt = dayjs().toDate();

        if (!name || !description || !instructions || !addedIngredients.size) {
            return;
        }

        const recipe: Recipe = {
            createdAt,
            name,
            nameLower: name.toLowerCase(),
            description,
            instructions,
            ingredients,
        };

        await DatabaseService.database.recipes.add(recipe);
    }

    function addIngredientToRecipe(ingredient: Ingredient) {
        if (!searchItemRef.current) return;
        searchItemRef.current.value = "";
        setFetchedIngredients([]);

        setAddedIngredients(
            new Map(
                addedIngredients.set(ingredient.id!, {
                    name: ingredient.name,
                    ingredientId: ingredient.id!,
                    quantity: 1,
                    unit: ingredient.defaultUnit ?? Constants.DEFAULT_UNIT,
                })
            )
        );
    }

    function updateQuantity(id: number, operation: -1 | 1) {
        const item = addedIngredients.get(id);

        if (!item) return;
        if (operation === -1 && item.quantity < 2) return;
        item.quantity += operation;

        const updated = new Map(addedIngredients.set(id, item));

        setAddedIngredients(updated);
    }

    function setUnit(id: number, unit: string) {
        const item = addedIngredients.get(id);

        if (!item) return;
        item.unit = unit;

        const updated = new Map(addedIngredients.set(id, item));

        setAddedIngredients(updated);
    }

    return (
        <Form
            ref={formRef}
            onSubmit={handleSubmit}
            className="d-flex justify-content-center gap-3 flex-column"
        >
            <Container fluid className="d-flex flex-column gap-2">
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        placeholder="My new recipe"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="My recipe description"
                        name="description"
                    />
                </Form.Group>

                <Stack className="position-relative" gap={3}>
                    <Dropdown show={fetchedIngredients.length > 0}>
                        <SearchInput
                            placeholder="My ingredient"
                            label="Ingredients"
                            search={searchIngredient}
                            ref={searchItemRef}
                        />
                        <Dropdown.Menu show={fetchedIngredients.length > 0}>
                            {fetchedIngredients.map((ingredient) => (
                                <Dropdown.Item
                                    as={"button"}
                                    onClick={() =>
                                        addIngredientToRecipe(ingredient)
                                    }
                                    key={`searched-ingredient-${ingredient.id!}`}
                                >
                                    {ingredient.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <ListGroup>
                        {Array.from(addedIngredients.values()).map(
                            (recipeIngredient) => (
                                <ListGroup.Item
                                    key={`ingredient-pill-${recipeIngredient.ingredientId!}`}
                                    className="d-flex gap-2 align-items-center"
                                >
                                    <Stack
                                        direction="horizontal"
                                        className="justify-content-between w-100"
                                    >
                                        <div className="d-flex align-items-center">
                                            {recipeIngredient.name} -{" "}
                                            {recipeIngredient.quantity}{" "}
                                        </div>
                                        <Stack>
                                            <UnitSelect
                                                value={recipeIngredient.unit}
                                                onChange={(value) =>
                                                    setUnit(
                                                        recipeIngredient.ingredientId,
                                                        value
                                                    )
                                                }
                                            />
                                            <Stack
                                                direction="horizontal"
                                                gap={3}
                                            >
                                                <ButtonGroup className="d-flex">
                                                    <Button
                                                        variant="outline-secondary"
                                                        disabled={
                                                            recipeIngredient.quantity <
                                                            2
                                                        }
                                                        onClick={() =>
                                                            updateQuantity(
                                                                recipeIngredient.ingredientId,
                                                                -1
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </Button>
                                                    <Button
                                                        variant="outline-secondary"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                recipeIngredient.ingredientId,
                                                                1
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </Button>
                                                </ButtonGroup>
                                                <div className="vr" />
                                                <span>
                                                    <CloseButton
                                                        onClick={() =>
                                                            removeIngredient(
                                                                recipeIngredient.ingredientId!
                                                            )
                                                        }
                                                    />
                                                </span>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </ListGroup.Item>
                            )
                        )}
                    </ListGroup>
                </Stack>

                <Form.Group>
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control
                        as={"textarea"}
                        rows={4}
                        placeholder="My recipe instructions"
                        name="instructions"
                    />
                </Form.Group>
            </Container>

            <Button type="submit">Create</Button>
        </Form>
    );
}
