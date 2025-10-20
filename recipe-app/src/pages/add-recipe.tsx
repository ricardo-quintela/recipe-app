import dayjs from "dayjs";
import { useRef, useState, type FormEvent } from "react";
import { Badge, Button, CloseButton, Container, Form } from "react-bootstrap";
import { SearchInput } from "../components/form/search-form/SearchInput";
import type { Ingredient } from "../data/Ingredient";
import type { Recipe } from "../data/Recipe";
import DatabaseService from "../services/DatabaseService";

export default function AddRecipe() {
	// createdAt: Date;
	const [ingredients, setIngredients] = useState<Map<number, Ingredient>>(
		new Map()
	);
	const formRef = useRef<HTMLFormElement>(null);

	function addIngredient(ingredient: Ingredient) {
		if (!ingredient.id) return;
		const updated = new Map(ingredients.set(ingredient.id, ingredient));

		setIngredients(updated);
	}

	function removeIngredient(id: number) {
		const updated = new Map(ingredients);
		if (!updated.delete(id)) return;

		setIngredients(updated);
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		if (!formRef.current) return;

		const data = new FormData(formRef.current);

		const name = data.get("name")?.toString();
		const description = data.get("description")?.toString();
		const instructions = data.get("instructions")?.toString();
		const ingredientIds = Array.from(ingredients.values()).map(
			(ing) => ing.id!
		);
		const createdAt = dayjs().toDate();

		if (!name || !description || !instructions || !ingredients.size) {
			return;
		}

		const recipe: Recipe = {
			createdAt,
			name,
			description,
			instructions,
			ingredients: ingredientIds.map((igId) => ({
				ingredientId: igId,
				quantity: 0,
				unit: "unit",
			})),
		};

		const recipeId = await DatabaseService.add("RECIPE", recipe);
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

				<SearchInput placeholder="My ingredient" label="Ingredients" />
				<Container>
					{Array.from(ingredients.values()).map((ingredient, id) => (
						<Badge pill bg="secondary">
							{ingredient.name}
							<span>
								<CloseButton
									onClick={() => removeIngredient(id)}
								/>
							</span>
						</Badge>
					))}
				</Container>

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
