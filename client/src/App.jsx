// Import Boostrap and CSS
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import NavBar from "./components/NavbarComponent";
import AirPlaneShows from "./components/MainPageComponent";
import LocalFunction from "./components/Local/LocalComponent";
import Regional from "./components/RegionalComponent";
import International from "./components/InternationalComponents";
import { Container, Row, Col, Button,Alert } from 'react-bootstrap';
import {Routes,Route, BrowserRouter,Outlet,Navigate } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={
          <>
            <NavBar/>
            <Container fluid={true} >
              <Outlet/>
            </Container>
          </>
          }>
          <Route index element = {<AirPlaneShows/>} /> 
          <Route path='/local' element ={<LocalFunction/>} />
          <Route path='/regional' element={<Regional/>} />
          <Route path='/international' element={<International/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
