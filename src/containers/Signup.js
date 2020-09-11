import "./Signup.css";

import { 
  API, 
  Auth, 
  // Storage,
} from "aws-amplify";
import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
  Row,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";

import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
    confirmationCode: "",
    bio: "",
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const [isWholesaler, setIsWholesaler] = useState(false);
  // const [file, setFile] = useState(false);

  useEffect(() => {}, []);

  // function handleFileChange(event) {
  //   setFile(event.target.files[0]);
  // }

  // async function s3Upload(file) {
  //   const filename = `${Date.now()}-${file.name}`;

  //   try {
  //     const stored = await Storage.put(filename, file, {
  //       level: "public",
  //       contentType: file.type,
  //     });
  //     return stored.key;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  function accountForm() {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Col xs={7}>

          </Col>
          <Col xs={5}>
              <FormGroup controlId="isBuyer" bsSize="large">
                <ControlLabel>Are you a buyer?</ControlLabel>
                  <input
                    type="checkbox"
                    checked={isBuyer}
                    onChange={() => setIsBuyer(!isBuyer)}
                  />
            </FormGroup>
            <FormGroup controlId="isWholesaler" bsSize="large">
              <ControlLabel>Are you a wholesaler?</ControlLabel>
                <input
                  type="checkbox"
                  checked={isWholesaler}
                  onChange={() => setIsWholesaler(!isWholesaler)}
                />
            </FormGroup>
              <FormGroup controlId="firstName" bsSize="large">
                <ControlLabel>First Name</ControlLabel>
                  <FormControl
                    autoFocus
                    type="text"
                    value={fields.firstName}
                    onChange={handleFieldChange}
                  />
              </FormGroup>
              <FormGroup controlId="lastName" bsSize="large">
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  type="text"
                  value={fields.lastName}
                  onChange={handleFieldChange}
                />
              </FormGroup>
          <FormGroup controlId="phoneNumber" bsSize="large">
            <ControlLabel>Phone Number</ControlLabel>
            <FormControl
              type="text"
              value={fields.phoneNumber}
              onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
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
          <FormGroup
            className="hidden"
            controlId="confirmPassword"
            bsSize="large"
          >
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              type="password"
              onChange={handleFieldChange}
              value={fields.password}
            />
          </FormGroup>
          {/* <FormGroup controlId="file">
            <ControlLabel>Profile Image</ControlLabel>
            <FormControl onChange={handleFileChange} type="file" />
          </FormGroup> */}
          <LoaderButton
            className="btn-primary"
            type="submit"
            bsSize="large"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Signup
          </LoaderButton>
          </Col>
        </form>
      </div>
    );
  }

  function validateForm() {
    return (
      fields.email.length > 5 &&
      fields.password.length > 5 &&
      fields.firstName.length > 1 &&
      fields.lastName.length > 1
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        attributes: {
          family_name: fields.lastName,
          given_name: fields.firstName,
        },
        username: fields.email,
        password: fields.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function createProfile() {
    // const image = file ? await s3Upload(file) : null;
    return API.post("profiles", "/profiles", {
      body: {
        email: fields.email,
        firstName: fields.firstName,
        lastName: fields.lastName,
        phoneNumber: fields.phoneNumber,
        isWholesaler,
        isBuyer,
        // image,
      },
    });
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      await createProfile();
      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <div>
        <form onSubmit={handleConfirmationSubmit}>
          <FormGroup controlId="confirmationCode" bsSize="large">
            <ControlLabel>Confirmation Code</ControlLabel>
            <FormControl
              type="tel"
              onChange={handleFieldChange}
              value={fields.confirmationCode}
            />
            <HelpBlock>Please check your email for the code.</HelpBlock>
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            isLoading={isLoading}
            disabled={!validateConfirmationForm()}
          >
            Verify
          </LoaderButton>
        </form>
      </div>
    );
  }

  return (
    <div className="Index">
      {/* <div className="Signup container text-center"> */}
        <Row>
          <Col sm={8} smOffset={2}>
            <br />
            {/* <div className="form-wrapper"> */}
              {newUser === null ? accountForm() : renderConfirmationForm()}
            {/* </div> */}
          </Col>
        </Row>
      {/* </div> */}
    </div>
  );
}
