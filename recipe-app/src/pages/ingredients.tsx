import { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { SearchForm } from "../components/form/search-form/SearchForm";
import type { Ingredient } from "../data/Ingredient";
import DatabaseService from "../services/DatabaseService";

export function Ingredients() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [filtered, setFiltered] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    async function searchIngredient(term: string) {
        const trimmed = term.trim();
        if (trimmed === "") return false;

        return (
            (await DatabaseService.database.ingredients
                .where("nameLower")
                .startsWith(trimmed)
                .count()) > 0
        );
    }

    async function addIngredient(name: string) {
        if (await searchIngredient(name)) return;

        const ingredient: Ingredient = {
            name,
            nameLower: name.toLowerCase(),
            stock: 0,
        };

        DatabaseService.database.ingredients.add(ingredient);
        setIngredients((prev) => [...prev, ingredient]);
    }

    useEffect(() => {
        setLoading(true);
        setError(false);
        DatabaseService.database.ingredients
            .toArray()
            .then((result) => setIngredients(result))
            .catch((e) => {
                setError(true);
                console.error("Failed to fetch ingredients: ", e);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setFiltered(ingredients);
    }, [ingredients]);

    return (
        <Container fluid className="d-flex flex-column gap-2">
            <SearchForm
                placeholder="Ingredient"
                onSubmit={(ingredient) => addIngredient(ingredient)}
                search={searchIngredient}
            />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {error ? (
                        <tr>
                            <td colSpan={3}>
                                <Container
                                    fluid
                                    className="d-flex justify-content-center text-danger"
                                >
                                    An error occurred
                                </Container>
                            </td>
                        </tr>
                    ) : loading ? (
                        <tr>
                            <td colSpan={3}>
                                <Container
                                    fluid
                                    className="d-flex justify-content-center"
                                >
                                    <Spinner />
                                </Container>
                            </td>
                        </tr>
                    ) : !filtered.length ? (
                        <tr>
                            <td colSpan={3}>
                                <Container
                                    fluid
                                    className="d-flex justify-content-center"
                                >
                                    No ingredients found
                                </Container>
                            </td>
                        </tr>
                    ) : (
                        filtered.map((ingredient) => (
                            <tr key={`ingredient-${ingredient.id}`}>
                                <td>{ingredient.name}</td>
                                <td>{ingredient.category ?? "-"}</td>
                                <td>{ingredient.stock}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </Container>
    );
}
