import React, { useState, useEffect } from "react";
import api from '../../services/API';
import qs from 'qs';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export default function Login({setToken}) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = true;
      setToken(foundUser);
    }
  }, [])

  const header = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  async function loginUser (credentials) {
    return api.post('auth/sign_in', qs.stringify(credentials), {headers: header});
  }
  
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    console.log("token", token);
    localStorage.setItem('user', JSON.stringify(token.data.token));
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}