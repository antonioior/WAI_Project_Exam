import Carousel from 'react-bootstrap/Carousel';

import local from '../images/local.jpg';
import regional from '../images/regional.jpg'
import international from '../images/international.jpg';

function AirplaneShows() {
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={local}
          alt="Local"
        />
        <Carousel.Caption>
          <h3>Local</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={regional}
          alt="Regional"
        />
        <Carousel.Caption>
          <h3>Regional</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={international}
          alt="International"
        />
        <Carousel.Caption>
          <h3>International</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default AirplaneShows;