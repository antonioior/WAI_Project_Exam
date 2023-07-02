import Button from 'react-bootstrap/Button';
import API from '../API';
import {useState, useEffect} from 'react';

function localFunction() {
  const [seats, setSeats] = useState([]);
  useEffect(()=> {
    const getSeats=async()=>{
    let s= await API.getLocalSeatsInfo();
    setSeats(s);
    }
    getSeats();
  },[]);
  return (
    <>
      <Button variant="primary">Primary</Button>{' '}
      <Button variant="secondary">Secondary</Button>{' '}
      <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button>{' '}
      <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button>{' '}
      <Button variant="dark">Dark</Button>
      <Button variant="link">Link</Button>
    </>
  );
}

export default localFunction;