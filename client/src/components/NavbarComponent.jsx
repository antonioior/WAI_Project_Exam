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
            <Nav.Link as="div">
              <Link to='/' as="div">
                Home
              </Link>
            </Nav.Link>
            <NavDropdown title="Menu" id="basic-nav-dropdown" as="div">
              <NavDropdown.Item>
                <Link to='/local' as="div">
                  Local
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to='/regional' as="div">
                  Regional
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to='/international' as="div">
                  International
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/reservation" as="div">
                  My reservation
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <div>
              {<ButtonLoginLogut user={user} logout={logout}/>}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function ButtonLoginLogut({user, logout}) {
  const navigation = useNavigate();
  if(!user)
    return(<Button className="mt-3" as="div" variant="secondary" onClick={() => navigation("/login")}>Login</Button>)
  else
    return(<Button className="mt-3" as="div" variant='secondary'  onClick={(event) => {event.preventDefault()
      logout().then(() => {if (location.pathname !== "/") navigation("/", {replace : true})})}}>{user.name}</Button>)
}

export default NavBar;