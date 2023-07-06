import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import {getReservationByUser} from '../API';
import { useNavigate } from 'react-router-dom';
import {useAuth} from './AuthContext';
import Button from 'react-bootstrap/Button';

function MyReservation(props) {
  const[reservation, setReservation] = useState(['', '', '']);
  const navigation = useNavigate();
  const {user} =useAuth();

  useEffect(() => {
    if(!user)
      navigation("/login", {replace :true})
      
    const reservation = async () => {
      const plane = ['', '', ''];
      const result = await getReservationByUser(user.id);
      for (const res of result){
        if(res==='local')
          plane[0] = "You have a reservation"
        else if(res=== 'regional')
          plane[1] = "You have a reservation"
        else
          plane[2] = "You have a reservation" 
      }
      setReservation(plane);  
    }
    reservation();
  }, []);

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Local</Accordion.Header>
        <Accordion.Body>
          {reservation[0]}
          <ButtonIfReservationExist
            exist={reservation[0]}
          />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Regional</Accordion.Header>
        <Accordion.Body>
          {reservation[1]}
          <ButtonIfReservationExist
            exist={reservation[1]}
          />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>International</Accordion.Header>
        <Accordion.Body>
          {reservation[2]}
          <ButtonIfReservationExist
            exist={reservation[2]}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function ButtonIfReservationExist({exist}){
  if(exist.length > 0)
    return (<Button variant="danger">Delete</Button>);
  else
    return (<></>)
}





export default MyReservation;