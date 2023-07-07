import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { deleteSeats, getReservationByUser } from "../API";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

function MyReservation(props) {
  let count=0;
  const [reservation, setReservation] = useState([]);
  const navigation = useNavigate();
  const { user } = useAuth();

  if(!user) navigation("/login", {replace : true}); 
  
  useEffect(() => {
    console.log(user.id);
    const getReservation = async() => {
      let result = await getReservationByUser(user.id);
      setReservation(result);
    };
    getReservation();
  }, []);


  console.log(reservation )
  return (
    <Form>
      <Accordion defaultActiveKey="0">
        <div>
          {reservation.map((x) =>(
            <PrintReservation 
            key={x.Id}
            reserve={x}
            userId = {user.id} 
            count = {count++}
            />
          ))}
        </div>
      </Accordion>
    </Form>
  );
}

function PrintReservation({ reserve, userId, count }) {
  const handleClick = async(event) => {
    event.preventDefault();
    console.log(userId);
    const res = await deleteSeats(userId, reserve);
  }

  console.log(count)

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
