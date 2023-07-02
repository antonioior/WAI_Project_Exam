import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useState, useEffect} from 'react';
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
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default International;