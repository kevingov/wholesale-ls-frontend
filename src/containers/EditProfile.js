import "./EditProfile.css";

import { API, Auth, Storage } from "aws-amplify";
import {  
    ControlLabel, 
    FormControl, 
    FormGroup,
    Col,
    Row, } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";

export default function EditProfile(props) {
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
    const [isLoading, setIsLoading] = useState(false);
    const [isBuyer, setIsBuyer] = useState(false);
    const [isWholesaler, setIsWholesaler] = useState(false);
    const [file, setFile] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [bio, setBio] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
    function loadProfile() {
        return API.get("profiles", `/profiles/${props.match.params.id}`);
    }

    async function onLoad() {
        try {
            const user = await Auth.currentUserInfo();
            const profile = await loadProfile();
            setFirstName(profile.firstName);
            setLastName(profile.lastName);
            setEmail(profile.email);
            setPassword(profile.password);
            setPhoneNumber(profile.phoneNumber);
            setConfirmPassword(profile.confirmPassword);
            setConfirmationCode(profile.confirmationCode);
            setBio(profile.bio);
            setIsBuyer(profile.isBuyer);
            setIsWholesaler(profile.isWholesaler);
            setFile(profile.groupShowingDate);
        } catch (e) {
            alert(e);
        }
        }

        onLoad();
    }, [props.match.params.id]);

    function saveProfile(profile) {
        return API.put("profiles", `/profiles/${props.match.params.id}`, {
            body: profile,
        });
    }

    function handleFileChange(event) {
        setFile(event.target.files[0]);
      }
    
    function validateForm() {
        return (
            fields.email.length > 5 &&
            fields.password.length > 5 &&
            fields.firstName.length > 1 &&
            fields.lastName.length > 1
        );
    }

    async function s3Upload(file) {
        const filename = `${Date.now()}-${file.name}`;
        
        try {
            const stored = await Storage.put(filename, file, {
                level: "public",
                contentType: file.type,
            });
            return stored.key;
        } catch (e) {
            console.log(e);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            const newImage = file ? await s3Upload(file) : Image;
            console.log(newImage);
            await saveProfile({
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                confirmPassword,
                confirmationCode,
                bio,
                isBuyer,
                isWholesaler,
            });
            props.history.push(`/profiles`);
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    return (
        <div className="EditProfile container">
            {!isLoading ? (
                <form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={6}>
                    <FormGroup controlId="firstName" bsSize="large">
                      <ControlLabel>First Name</ControlLabel>
                      <FormControl
                        autoFocus
                        type="text"
                        value={fields.firstName}
                        onChange={handleFieldChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={6}>
                    <FormGroup controlId="lastName" bsSize="large">
                      <ControlLabel>Last Name</ControlLabel>
                      <FormControl
                        type="text"
                        value={fields.lastName}
                        onChange={handleFieldChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup controlId="phoneNumber" bsSize="large">
                  <ControlLabel>Phone Number</ControlLabel>
                  <FormControl
                    type="text"
                    value={fields.phoneNumber}
                    onChange={handleFieldChange}
                  />
                </FormGroup>
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
                <FormGroup controlId="bio" bsSize="large">
                  <ControlLabel>Include a Short Bio</ControlLabel>
                  <FormControl
                    type="textarea"
                    value={fields.bio}
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
                <FormGroup controlId="file">
                  <ControlLabel>Profile Image</ControlLabel>
                  <FormControl onChange={handleFileChange} type="file" />
                </FormGroup>
                <LoaderButton
                  className="btn-primary"
                  type="submit"
                  bsSize="large"
                  isLoading={isLoading}
                  disabled={!validateForm()}
                >
                  Update
                </LoaderButton>
              </form>
            ) : (
                <Loading />
            )}
        </div>
            
    )
}