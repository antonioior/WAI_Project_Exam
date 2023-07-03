// Import Boostrap and CSS
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import NavBar from "./components/NavbarComponent";
import AirPlaneShows from "./components/MainPageComponent";
import { Container, Row, Col, Button,Alert } from 'react-bootstrap';
import {Routes,Route, BrowserRouter,Outlet,Navigate } from 'react-router-dom';
import Seats from "./components/Seats/Seats";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={
          <>
            <NavBar/>
            <Container fluid>
              <Outlet/>
            </Container>
          </>
          }>
          <Route index element = {<AirPlaneShows/>} /> 
          <Route path='/local' element ={<Seats/>} />
          <Route path='/regional' element={<Seats/>} />
          <Route path='/international' element={<Seats/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
