import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "./AuthComponent";

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <Navbar expand="sm" sticky="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>AirplaneSeats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as="div"
              style={{
                margin: 15,
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "blue",
                }}
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link
              as="div"
              style={{
                margin: 15,
              }}
            >
              <Link
                to="/reservation"
                style={{
                  textDecoration: "none",
                  color: "blue",
                }}
              >
                My reservation
              </Link>
            </Nav.Link>
            <div>{<ButtonLoginLogut user={user} logout={logout} />}</div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function ButtonLoginLogut({ user, logout }) {
  const navigation = useNavigate();
  if (!user)
    return (
      <Button
        className="mt-3"
        as="div"
        variant="secondary"
        onClick={() => navigation("/login")}
      >
        Login
      </Button>
    );
  else
    return (
      <Button
        className="mt-3"
        as="div"
        variant="secondary"
        onClick={(event) => {
          event.preventDefault();
          logout().then(() => {
            if (location.pathname !== "/") navigation("/", { replace: true });
          });
        }}
      >
        {user.name}
      </Button>
    );
}

export default NavBar;
