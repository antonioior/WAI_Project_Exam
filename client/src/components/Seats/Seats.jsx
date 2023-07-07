import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { getSeatsInfo, reserveSeats} from "../../API";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { useAuth } from "../AuthContext";
function Seats() {
  const [seats, setSeats] = useState([]);
  const localtion = useLocation();
  const navigation = useNavigate();
  const [reservation, setReservation] = useState([]);
  const {user} = useAuth();
  
  useEffect(() => {
    const getSeats = async () => {
      let s = await getSeatsInfo(localtion.pathname);
      setSeats(s);
    };
    getSeats();
  }, [localtion.pathname]);

  const handleSubmit = async (data) => {
    data.preventDefault();
    console.log(reservation);
    const result = reservation.map(x => ({Id : x.slice(0, x.length-1), Column : x[x.length-1]}));
    if(!user)
      navigation('/login', {replace : true})
    reserveSeats(user.id, location.pathname.slice(1), result)
      .then(() => navigation('/reservation', {replace : true}))
  }

  //To perform seats occupied avaible and total for every plane
  const [occupiedSeat, avaibleSeat, totalSeat] = occupiedAvaibleTotalSeat(
    seats,
    location.pathname
  );
  
  //Return
  //console.log(value);
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={5}>
          <Table borderless={true}>
            <tbody>
              {seats.map((s, i) => (
                <tr key={s.Id}>
                  <ButtonRow
                    seat={s}
                    type={location.pathname}
                    props={reservation}
                    setter={setReservation}
                  />
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={4}>
          <div>
            <span>
              Occupied seat :
              <ProgressBar
                striped
                variant="danger"
                min={0}
                now={occupiedSeat}
                max={totalSeat}
                label={occupiedSeat}
              />
            </span>
            <span>
              Avaible seat :
              <ProgressBar
                striped
                variant="success"
                min={0}
                now={avaibleSeat}
                max={totalSeat}
                label={avaibleSeat}
              />
            </span>
            <span>
              Total seat :
              <ProgressBar
                striped
                variant="info"
                min={0}
                now={totalSeat}
                max={totalSeat}
                label={totalSeat}
              />
            </span>
          </div>
          <Container>
            <Button variant="success" type="submit" onSubmit={handleSubmit}>
              Submit
            </Button>
            <Button variant="danger" type="submit" href={localtion.pathname}>
              Cancel
            </Button>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

function occupiedAvaibleTotalSeat(seats, type) {
  let occupiedSeat = 0,
    avaibleSeat = 0,
    totalSeat = 0;
  for (let seat of seats) {
    seat.A ? occupiedSeat++ : avaibleSeat++;
    seat.B ? occupiedSeat++ : avaibleSeat++;
    seat.C ? occupiedSeat++ : avaibleSeat++;
    seat.D ? occupiedSeat++ : avaibleSeat++;
    totalSeat += 4;
    switch (type) {
      case "/regional": {
        seat.E ? occupiedSeat++ : avaibleSeat++;
        totalSeat++;
        break;
      }
      case "/international":
        seat.E ? occupiedSeat++ : avaibleSeat++;
        seat.F ? occupiedSeat++ : avaibleSeat++;
        totalSeat += 2;
        break;
    }
  }
  return [occupiedSeat, avaibleSeat, totalSeat];
}

export default Seats;



function ButtonRow({ seat, type, props, setter }) {

  const handleChange = (val) => {
    console.log(val);
    setter(val);
  }
  let colorA, colorB, colorC, colorD, colorE, colorF;
  colorA = seat.A ? "danger" : "success";
  colorB = seat.B ? "danger" : "success";
  colorC = seat.C ? "danger" : "success";
  colorD = seat.D ? "danger" : "success";
  const button = [
      <ToggleButton
        id={seat.Id+"A"}
        key={seat.Id+"A"}
        variant={colorA}
        className="sizebutton"
        value={seat.Id+"A"}
        disabled={colorA === "danger"}
        
      >
        {seat.Id}
        {"A"}
      </ToggleButton>,
      <ToggleButton
        id={seat.Id+"B"}
        key={seat.Id+"B"}
        variant={colorB}
        className="sizebutton"
        value={seat.Id+"B"}
        disabled={colorB === "danger"}
      >
        {seat.Id}
        {"B"}
      </ToggleButton>,
      <ToggleButton
        id={seat.Id+"C"}
        key={seat.Id+"C"}
        variant={colorC}
        className="sizebutton"
        value={seat.Id+"C"}
        disabled={colorC === "danger"}
      >
        {seat.Id}
        {"C"}
      </ToggleButton>,
      <ToggleButton
        id={seat.Id+"D"}
        key={seat.Id+"D"}
        variant={colorD}
        className="sizebutton"
        value={seat.Id+"D"}
        disabled={colorD === "danger"}
      >
        {seat.Id}
        {"D"}
      </ToggleButton>
  ];
  switch (type) {
    case "/regional": {
      colorE = seat.E ? "danger" : "success";
      button.push(
          <ToggleButton
            id={seat.Id+"E"}
            key={seat.Id+"E"}
            variant={colorE}
            className="sizebutton"
            value={seat.Id+"E"}
            disabled={colorE === "danger"}
          >
            {seat.Id}
            {"E"}
          </ToggleButton>
      );
      break;
    }
    case "/international": {
      colorE = seat.E ? "danger" : "success";
      colorF = seat.F ? "danger" : "success";
      button.push(
          <ToggleButton
            id={seat.Id+"E"}
            key={seat.Id+"E"}
            variant={colorE}
            className="sizebutton"
            value={seat.Id+"E"}
            disabled={colorE === "danger"}
          >
            {seat.Id}
            {"E"}
          </ToggleButton>
      );
      button.push(
          <ToggleButton
            id={seat.Id+"F"}
            key={seat.Id+"F"}
            variant={colorF}
            className="sizebutton"
            value={seat.Id+"F"}
            disabled={colorF === "danger"}
          >
            {seat.Id}
            {"F"}
          </ToggleButton>
      );
      break;
    }
    default:
      break;
  }
  return (
    <ToggleButtonGroup type="checkbox" value={props} onChange={handleChange}>
      {button.map(b => b)}
    </ToggleButtonGroup>
  )
}
