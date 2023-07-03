import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from 'react';
import {Table, Container} from 'react-bootstrap';
import API from '../../API';
import './index.css';

function localFunction() {
  const [seats, setSeats] = useState([]);
  useEffect(()=> {
    const getSeats=async()=>{
    let s= await API.getLocalSeatsInfo();
    setSeats(s);
    }
    getSeats();
  },[]);
  const [occupiedSeat, avaibleSeat, totalSeat] = occupiedAvaibleTotalSeat(seats);
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Table borderless={true}>
            <tbody>
              {seats.map(s => <tr><ButtonRow seat={s} key={s.Id}/></tr>)}
            </tbody>
          </Table>
        </Col>
        <Col md={5}>
          <div>
            <p>
              Occupied seat : 
              <ProgressBar striped variant="danger" min={0} now={occupiedSeat} max={totalSeat} label={occupiedSeat} />
            </p>
            <p>
              Avaible seat :
              <ProgressBar striped variant="success" min={0} now={avaibleSeat} max={totalSeat} label={avaibleSeat} />
            </p>
            <p>
              Total seat : 
              <ProgressBar striped variant="info"  min={0} now={totalSeat} max={totalSeat} label={totalSeat} />
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function ButtonRow(props){
  return (
    <>
      <td>{props.seat.A? <Button variant="danger" className='sizebutton'>{props.seat.Id}{'A'}</Button> : <Button variant= "success" className='sizebutton'>{props.seat.Id}{'A'}</Button>}</td>
      <td>{props.seat.B? <Button variant="danger" className='sizebutton'>{props.seat.Id}{'B'}</Button> : <Button variant= "success" className='sizebutton'>{props.seat.Id}{'B'}</Button>}</td>
      <td>{props.seat.C? <Button variant="danger" className='sizebutton'>{props.seat.Id}{'C'}</Button> : <Button variant= "success" className='sizebutton'>{props.seat.Id}{'C'}</Button>}</td>
      <td>{props.seat.D? <Button variant="danger" className='sizebutton'>{props.seat.Id}{'D'}</Button> : <Button variant= "success" className='sizebutton'>{props.seat.Id}{'D'}</Button>}</td>
    </>
  )
}

function occupiedAvaibleTotalSeat(seats){
  let occupiedSeat = 0, avaibleSeat = 0, totalSeat = 0;
  for(let seat of seats){
    seat.A ? occupiedSeat++ : avaibleSeat++;
    seat.B ? occupiedSeat++ : avaibleSeat++;
    seat.C ? occupiedSeat++ : avaibleSeat++;
    seat.D ? occupiedSeat++ : avaibleSeat++;
    totalSeat += 4;
  }
  return [occupiedSeat, avaibleSeat, totalSeat];
}

export default localFunction;