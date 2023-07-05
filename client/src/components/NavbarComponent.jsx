import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from './AuthComponent';
function NavBar() {
  return (
    <Navbar expand="sm" sticky="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>AirplaneSeats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href='/'>Home</Nav.Link>
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="/local">Local</NavDropdown.Item>
              <NavDropdown.Item href="/regional">Regional</NavDropdown.Item>
              <NavDropdown.Item href="/international">International</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/reservation">My reservation</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;