import Carousel from 'react-bootstrap/Carousel';
import Img from 'react-bootstrap/Image'
import local from '../images/local.jpg';
import regional from '../images/regional.jpg'
import international from '../images/international.jpg';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom';

function AirplaneShows() {  
  return (
    <Container style = {{marginTop : "75px"}}>
      <Carousel style={{ width: "1280px", height: "720px" }}>
        <Carousel.Item interval={2000}>
          <Link to={'/local'}>
            <Img
              className="d-block w-100"
              src={local}
              alt="Local"
              fluid
            />
          </Link>
          <Carousel.Caption>
            <h3>Local</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <Link to={'/regional'}>
            <Img
              className="d-block w-100"
              src={regional}
              alt="Regional"
              fluid
            />
          </Link>
          <Carousel.Caption>
            <h3>Regional</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <Link to={'/international'}>
            <Img
              className="d-block w-100"
              src={international}
              alt="International"
              fluid
            />
          </Link>
          <Carousel.Caption>
            <h3>International</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default AirplaneShows;