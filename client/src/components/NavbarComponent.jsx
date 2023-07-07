import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from './LoginComponent';
import { Link, useNavigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {useAuth} from "./AuthContext"

function NavBar() {
  const {user, logout} = useAuth();
  const navigation = useNavigate();
  return (
    <Navbar expand="sm" sticky="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>AirplaneSeats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to='/'>
                Home
              </Link>
            </Nav.Link>
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to='/local'>
                  Local
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to='/regional'>
                  Regional
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to='/international'>
                  International
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/reservation">
                  My reservation
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            {user ? 
              <Button variant='secondary' onClick={() => {
                logout().then(() => {if (location.pathname !== "/") navigation("/")})}}>{user.name}</Button> : 
              <Button href="/login" className="mt-3" variant="secondary">Login</Button>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;