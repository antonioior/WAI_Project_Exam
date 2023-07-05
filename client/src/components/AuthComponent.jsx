import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = { username, password };

    props.login(credentials)
    .catch((err) => { 
      setErrorMessage(err.error)
    });
  }


  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
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
      <Button variant="primary" type="submit" onSubmit={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default Login;