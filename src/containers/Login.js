import "./Signup.css";

import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Row,
  Image,
} from "react-bootstrap";
import React, { useState } from "react";

import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login container">
      <Row>
        {/* <Col sm={8} smOffset={2}> */}
          <Col xs={7} className="signup-left">
              <Image 
                  src="https://wholesale-ls-marketing.s3.amazonaws.com/Christian/Signup-Characters.png" 
                  fluid sizes="(max-width: 380px) 100vw, 380px"
                  className="center login-picture"
                  >

              </Image>
            </Col>
          
            <form onSubmit={handleSubmit}>
            <Col xs={5}>
              <div className="signup-form">

                <h1>Login</h1>
                <p>Welcome Back</p>

              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={fields.email}
                  onChange={handleFieldChange}
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  value={fields.password}
                  onChange={handleFieldChange}
                />
              </FormGroup>
              <LoaderButton
                className="btn-primary"
                type="submit"
                bsSize="large"
                isLoading={isLoading}
                disabled={!validateForm()}
              >
                Login
              </LoaderButton>
              </div>
              </Col>
            </form>
          
        {/* </Col> */}
      </Row>
    </div>
  );
}
