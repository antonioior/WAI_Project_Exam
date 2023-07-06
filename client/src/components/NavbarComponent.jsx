import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from './LoginComponent';
import { Link } from 'react-router-dom';
function NavBar() {
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
                <Link to="/login">
                  Login
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/reservation">
                  My reservation
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;