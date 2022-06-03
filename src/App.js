import React, { useState } from "react";
import "./App.css";
import { Form, Button } from 'react-bootstrap'

function App() {

  const [errorMessage, setErrorMessage] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const database = [
    {
      username: "admin",
      password: "admin"
    },
  ];

  const errors = {
    usernameerror: "invalid username",
    passworderror: "invalid password"
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var { usernameerror, passworderror } = document.forms[0];

    const userData = database.find((user) => user.username === usernameerror.value);

    if (userData) {
      if (userData.password !== passworderror.value) {
        setErrorMessage({ name: "passworderror", message: errors.passworderror });
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessage({ name: "usernameerror", message: errors.usernameerror });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessage.name && (
      <div className="error">{errorMessage.message}</div>
    );

  const renderForm = (
  <div className="form">
    <Form onSubmit={handleSubmit}>
      <div className="input-container">
          <label>Username </label>
          <input type="text" name="usernameerror" required />
          {renderErrorMessage("usernameerror")}
          <Form.Text className="text-muted">
          Test User Name: admin
          </Form.Text>
      </div>
      
      <div className="input-container">
        <label>Password </label>
        <input type="password" name="passworderror" required />
        {renderErrorMessage("passworderror")}
        <Form.Text className="text-muted">
        Test password: admin
        </Form.Text>
      </div>

      <Button className="float-end" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>Login Successful</div> : renderForm}
      </div>
    </div>
  );
}

export default App;