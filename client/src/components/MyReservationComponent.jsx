import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { deleteSeats, getReservationByUser } from "../API";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthComponent";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

function MyReservation() {
  let count=0;
  const [reservation, setReservation] = useState([]);
  const navigation = useNavigate();
  const { user } = useAuth();

  
  useEffect(() => {
    if(!user)
      navigation("/login", {replace : true});
    else{
      const getReservation = async() => {
        let result = await getReservationByUser(user.id);
        setReservation(result);
      };
      getReservation();
    }
  }, []);
  return (
    <Form>
      <Accordion defaultActiveKey="0">
        <div>
          {reservation.length !== 0 ? 
            reservation.map((x) =>(
            <PrintReservation 
            key={count}
            reserve={x}
            userId = {user.id} 
            count = {count++}
            />
            )) : 
            "You have not some reservations"}
        </div>
      </Accordion>
    </Form>
  );
}

function PrintReservation({ reserve, userId, count }) {
  const navigation = useNavigate();
  const handleClick = async(event) => {
    event.preventDefault();
    const res = await deleteSeats(userId, reserve);
    navigation('/', {replace : true})
  }
  return(
  <Accordion.Item eventKey={count}>
    <Accordion.Header>{reserve}</Accordion.Header>
      <Accordion.Body>
        <Button onClick={handleClick}
          variant="danger"
          disabled={reserve.value === ""}>
          Delete
        </Button>
    </Accordion.Body>
  </Accordion.Item>
  )
}

export default MyReservation;
