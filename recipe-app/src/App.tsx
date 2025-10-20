import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Menu } from "./components/navigation/menu/Menu";

function App() {
	return (
		<BrowserRouter>
			<Container fluid>
				<Menu />
				<Routes>
					{routes.map((route) => (
						<Route
							key={`route-${route.type}`}
							index={route.default}
							element={route.element}
							path={route.path}
						/>
					))}
				</Routes>
			</Container>
		</BrowserRouter>
	);
}

export default App;
