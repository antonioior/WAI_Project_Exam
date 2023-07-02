// Import Boostrap and CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//React elements
import NavBar from "./components/NavbarComponent";
import AirPlaneShows from "./components/MainPageComponent";
import Local from "./components/LocalComponent";
import { Container, Row, Col, Button,Alert } from 'react-bootstrap'
import {Routes,Route, BrowserRouter,Outlet,Navigate } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={
          <>
            <NavBar/>
            <Container fluid >
              <Outlet/>
            </Container>
          </>
          }>
          <Route index element = {<AirPlaneShows/>} /> 
          <Route path='/local' element ={<Local/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
