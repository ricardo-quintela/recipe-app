import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { defaultPage, routes } from "../../../routes";
import { Constants } from "../../../utils/Constants";
import { useToggle } from "../../../hooks/useToggle";

export function Menu() {
    const navigate = useNavigate();
    const { state: opened, toggleState: toggleOpened } = useToggle();

    const gotoHome = () => navigate(defaultPage.path);

    return (
        <Navbar expand={false} expanded={opened}>
            <Container fluid>
                <Navbar.Brand onClick={gotoHome}>
                    {Constants.APP_NAME}
                </Navbar.Brand>
                <Navbar.Toggle onClick={toggleOpened} />
                <Navbar.Offcanvas placement="end">
                    <Offcanvas.Header closeButton onHide={toggleOpened}>
                        <Offcanvas.Title>{Constants.APP_NAME}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav>
                            {routes.map((route) => (
                                <Nav.Link
                                    key={`nav-link-${route.type}`}
                                    onClick={() => {
                                        toggleOpened();
                                        navigate(route.path);
                                    }}
                                >
                                    {route.name}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}
