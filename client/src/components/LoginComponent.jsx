import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useAuth } from './AuthContext';
import {Link, useNavigate} from "react-router-dom";
import { useEffect } from 'react';
import {getSession} from '../API';
function Login() {
  const {user, login} = useAuth();
  const navigation = useNavigate();
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erros, setErrors] = useState({
    email : {messaage: ""},
    password : {message : ""}
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault();
    const res = await login({
      username: email,
      password: password
    })
    const status = getSession();
    if(status)
      navigation("/login", {replace :true})
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          required={true}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          require={true}
          />
      </Form.Group>
        <Button variant="primary" type="submit">
         Submit
        </Button>
    </Form>
  );
}

export default Login;