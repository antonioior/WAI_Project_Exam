import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { getReservationByUser } from "../API";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

function MyReservation(props) {
  const [reservation, setReservation] = useState([]);
  const navigation = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) navigation("/login", { replace: true });

    const reservation = async () => {
      const plane = [
        {Id : 0, planeType : "Local",  value : ""},
        {Id : 1, planeType : "Regional", value : ""},
        {Id : 2, planeType : "International", value : ""}];
      const result = await getReservationByUser(user.id);
      for (const res of result) {
        if (res === "local") plane[0].value = "You have a reservation";
        else if (res === "regional") plane[1].value = "You have a reservation";
        else plane[2].value = "You have a reservation";
      }
      setReservation(plane);
    };
    reservation();
  }, [reservation]);

  const handleClick = async (data) => {
    data.preventDefault();
    console.log(data);
    // switch(key){
    //   case 1:
    //     deleteSeats(user.id, 'local')
    //     break;
    //   case 2:
    //     deleteSeats(user.id,'regional')
    //     break;
    //   case 3:
    //     deleteSeats(user.id, 'international')
    //     break
    // }
    
  }

  console.log(reservation )
  return (
    <Form onClick={handleClick}>
      <Accordion defaultActiveKey="0">
        <div>
          {reservation.map((x) =>(
            <PrintReservation 
            key={x.Id}
            reserve={x} 
            />
          ))}
        </div>
      </Accordion>
    </Form>
  );
}

function PrintReservation({ reserve }) {
  console.log(reserve);
  return(<Accordion.Item eventKey={reserve.Id}>
    <Accordion.Header>{reserve.planeType}</Accordion.Header>
      <Accordion.Body>
        {reserve.value}
      <Button 
        variant="danger"
        disabled={reserve.value === ""}>
        Delete
      </Button>
    </Accordion.Body>
  </Accordion.Item>
  )
}

export default MyReservation;
