import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react';
import {Table, Container} from 'react-bootstrap';
import API from '../API'


function International() {
  const [seats, setSeats] = useState([]);
  useEffect(()=> {
    const getSeats=async()=>{
    let s= await API.getInternationalSeatsInfo();
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
  )
}

function ButtonRow(props){
  return (
    <>
      <td>{props.seat.A? <Button variant="danger">{props.seat.Id}{'A'}</Button> : <Button variant= "success">{props.seat.Id}{'A'}</Button>}</td>
      <td>{props.seat.B? <Button variant="danger">{props.seat.Id}{'B'}</Button> : <Button variant= "success">{props.seat.Id}{'B'}</Button>}</td>
      <td>{props.seat.C? <Button variant="danger">{props.seat.Id}{'C'}</Button> : <Button variant= "success">{props.seat.Id}{'C'}</Button>}</td>
      <td>{props.seat.D? <Button variant="danger">{props.seat.Id}{'D'}</Button> : <Button variant= "success">{props.seat.Id}{'D'}</Button>}</td>
      <td>{props.seat.D? <Button variant="danger">{props.seat.Id}{'E'}</Button> : <Button variant= "success">{props.seat.Id}{'E'}</Button>}</td>
      <td>{props.seat.D? <Button variant="danger">{props.seat.Id}{'F'}</Button> : <Button variant= "success">{props.seat.Id}{'F'}</Button>}</td>
    </>
  )
}

export default International;