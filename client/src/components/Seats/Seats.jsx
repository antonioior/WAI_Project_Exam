import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from 'react';
import {Table, Container} from 'react-bootstrap';
import API from '../../API';
import './index.css';
import {useLocation} from "react-router-dom";

function Seats() {
  const [seats, setSeats] = useState([]);
  const localtion = useLocation();;
  useEffect(()=> {
    const getSeats=async()=>{
      let s;
      switch(location.pathname) {
        case '/local':{
          s= await API.getLocalSeatsInfo();
          break;
        }
        case '/regional':{
          s = await API.getRegionalSeatsInfo();
          break;
        }
        case '/international':{
          s= await API.getInternationalSeatsInfo();
          break;
        }
        default:
          break;
      }
    setSeats(s);
    }
    getSeats();
  },[]);
  
  const [occupiedSeat, avaibleSeat, totalSeat] = occupiedAvaibleTotalSeat(seats, location.pathname);
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Table borderless={true}>
            <tbody>
              {seats.map(s => <tr><ButtonRow seat={s} type={location.pathname} key={s.Id}/></tr>)}
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

function ButtonRow({seat, type}){
  let colorA, colorB, colorC, colorD, colorE, colorF;
  colorA = seat.A ? "danger" : "success" ;
  colorB = seat.B ? "danger" : "success" ;
  colorC = seat.C ? "danger" : "success" ;
  colorD = seat.D ? "danger" : "success" ;

  const button = [
    <td key = {1}><Button variant={colorA} className='sizebutton'>{seat.Id}{'A'}</Button></td>,
    <td key={2}><Button variant={colorB} className='sizebutton'>{seat.Id}{'B'}</Button></td>,
    <td key={3}><Button variant={colorC} className='sizebutton'>{seat.Id}{'C'}</Button></td>,
    <td key={4}><Button variant={colorD} className='sizebutton'>{seat.Id}{'D'}</Button></td>
  ];

  switch(type){
    case '/regional':{
      colorE = seat.E ? "danger" : "success" ;
      button.push(<td key={5}><Button variant={colorE} className='sizebutton'>{seat.Id}{'E'}</Button></td>)
      return(
      <>
        {button.map(b => b)}
      </>
      )
    }
    case '/international':{
      colorE = seat.E ? "danger" : "success" ;
      colorF = seat.F ? "danger" : "success" ;
      button.push(<td key={5}><Button variant={colorE} className='sizebutton'>{seat.Id}{'E'}</Button></td>);
      button.push(<td key={6}><Button variant={colorF} className='sizebutton'>{seat.Id}{'F'}</Button></td>);
      return(
        <>
          {button.map(b => b)}
        </>
      )
    }
    default:
      return(
        <>
          {button.map(b => b)}
        </>
      )
  }
}

function occupiedAvaibleTotalSeat(seats, type){
  let occupiedSeat = 0, avaibleSeat = 0, totalSeat = 0;
  for(let seat of seats){
    seat.A ? occupiedSeat++ : avaibleSeat++;
    seat.B ? occupiedSeat++ : avaibleSeat++;
    seat.C ? occupiedSeat++ : avaibleSeat++;
    seat.D ? occupiedSeat++ : avaibleSeat++;
    totalSeat += 4;
    switch(type){
      case '/regional':{
        seat.E? occupiedSeat++ : avaibleSeat++;
        totalSeat++;
        break;
      }
      case '/international':
        seat.E ? occupiedSeat++ : avaibleSeat++;
        seat.F ? occupiedSeat++ : avaibleSeat++;
        totalSeat+=2;
        break;

    }
  }
  return [occupiedSeat, avaibleSeat, totalSeat];
}

export default Seats;