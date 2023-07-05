import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { getSeatsInfo, patchReserveSeat } from "../../API";
import "./index.css";
import { useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';

function Seats() {
  const [seats, setSeats] = useState([]);
  const localtion = useLocation();
  const [value, setValue] = useState([[]]);
  
  useEffect(() => {
    const getSeats = async () => {
      let s = await getSeatsInfo(localtion.pathname);
      setSeats(s);
    };
    getSeats();
  }, []);

  const [occupiedSeat, avaibleSeat, totalSeat] = occupiedAvaibleTotalSeat(
    seats,
    location.pathname
  );
  const handleSubmit = (data) => {
    data.preventDefault();
  }
  
  console.log(value);
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
                    props={value[i]}
                    setter={setValue}
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
            <Button variant="success" type="submit">
              Submit
            </Button>
            <Button variant="danger" type="submit">
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

//import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function ButtonRow({ seat, type, props, setter }) {
  const handleChange = (val) => setter(val);
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
        value={1}
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
        value={2}
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
        value={3}
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
        value={4}
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
            value={5}
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
            value={5}
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
            value={6}
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
