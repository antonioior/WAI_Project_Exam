import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import {getReservationByUser} from '../API';
import { useNavigate } from 'react-router-dom';
import {useAuth} from './AuthContext';

function MyReservation(props) {
  const[reservation, setReservation] = useState([]);
  const navigation = useNavigate();
  const {user} =useAuth();
  useEffect(() => {
    console.log(user);
    if(!user)
      navigation("/login", {replace :true})
    
    const reservation = async () => {
      const result = await getReservationByUser(user.id);
      console.log(result);
      setReservation(result);  
    }
    reservation();
  }, []);

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Local</Accordion.Header>
        <Accordion.Body>
          {reservation.map(x => x.AirplaneType )}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Regional</Accordion.Header>
        <Accordion.Body>
          {reservation.map(x => x.AirplaneType)}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>International</Accordion.Header>
        <Accordion.Body>
          {reservation.map(x => x.AirplaneType)}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}





export default MyReservation;