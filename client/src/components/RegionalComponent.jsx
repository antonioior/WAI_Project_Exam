import {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import API from '../API';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
function Regional() {
  const [seats, setSeats] = useState([]);
  useEffect(()=> {
    const getSeats=async()=>{
    let s= await API.getRegionalSeatsInfo();
    setSeats(s);
    }
    getSeats();
  },[]);

  return (
    <Container fluid="xxl">
      <Table borderless={true}>
        <tbody>
          {seats.map(s => <tr><ButtonRow seat={s} key={s.Id}/></tr>)}
        </tbody>
      </Table>
    </Container>
  );
}

function ButtonRow(props){
  console.log(props.seat.A)
  return (
    <>
      <td>{props.seat.A? <Button variant="danger">{props.seat.Id}{'A'}</Button> : <Button variant= "success">{props.seat.Id}{'A'}</Button>}</td>
      <td>{props.seat.B? <Button variant="danger">{props.seat.Id}{'B'}</Button> : <Button variant= "success">{props.seat.Id}{'B'}</Button>}</td>
      <td>{props.seat.C? <Button variant="danger">{props.seat.Id}{'C'}</Button> : <Button variant= "success">{props.seat.Id}{'C'}</Button>}</td>
      <td>{props.seat.D? <Button variant="danger">{props.seat.Id}{'D'}</Button> : <Button variant= "success">{props.seat.Id}{'D'}</Button>}</td>
      <td>{props.seat.E? <Button variant="danger">{props.seat.Id}{'E'}</Button> : <Button variant= "success">{props.seat.Id}{'E'}</Button>}</td>
    </>
  )
}

export default Regional;