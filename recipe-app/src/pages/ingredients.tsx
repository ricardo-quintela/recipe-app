import { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { SearchForm } from "../components/form/search-form/SearchForm";
import type { Ingredient } from "../data/Ingredient";
import DatabaseService, { ETable } from "../services/DatabaseService";

export function Ingredients() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [filtered, setFiltered] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    async function getIngredients() {
        setLoading(true);
        setError(false);
        try {
            const fetched = await DatabaseService.getAll(ETable.INGREDIENT);
            setIngredients(fetched);
            setFiltered(fetched);
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    async function addIngredient(text: string) {
        const ingredient: Ingredient = {
            name: text,
            stock: 0,
        };

        const id = await DatabaseService.add(ETable.INGREDIENT, ingredient);

        ingredient.id = id;

        setIngredients((prev) => [...prev, ingredient]);
    }

    function searchIngredients(term: string) {
        if (term.length === 0) {
            setFiltered(ingredients);
            return false;
        }

        const searched = ingredients.filter(
            (ingredient) =>
                ingredient.name.toLowerCase().slice(0, term.length) ===
                term.toLowerCase().trim()
        );

        setFiltered(searched);

        return searched.length > 0;
    }

    useEffect(() => {
        getIngredients();
    }, []);

    useEffect(() => {
        setFiltered(ingredients);
    }, [ingredients]);

    return (
        <Container fluid className="d-flex flex-column gap-2">
            <SearchForm
                placeholder="Ingredient"
                onSubmit={addIngredient}
                search={searchIngredients}
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
