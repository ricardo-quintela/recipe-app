import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Recipes() {
	const navigate = useNavigate();

	return (
		<Container>
			<Button onClick={() => navigate("add-recipe")}>New recipe</Button>
		</Container>
	);
}
