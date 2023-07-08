import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {useAuth} from "./AuthComponent"

function NavBar() {
  const {user, logout} = useAuth();
  
  return (
    <Navbar expand="sm" sticky="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>AirplaneSeats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link id="RouterNavLink" style={null}>
              <Link id="RouterNavLink" style={null} to='/'>
                Home
              </Link>
            </Nav.Link>
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link id="RouterNavLink" style={null} to='/local'>
                  Local
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link id="RouterNavLink" style={null} to='/regional'>
                  Regional
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link id="RouterNavLink" style={null} to='/international'>
                  International
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link id="RouterNavLink" style={null} to="/reservation">
                  My reservation
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
              <ButtonLoginLogut user={user} logout={logout}/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function ButtonLoginLogut({user, logout}) {
  const navigation = useNavigate();
  if(!user)
    return(<Button href="/login" className="mt-3" variant="secondary">Login</Button>)
  else
    return(<Button variant='secondary' onClick={() => {
      logout().then(() => {if (location.pathname !== "/") navigation("/")})}}>{user.name}</Button>)

}

export default NavBar;