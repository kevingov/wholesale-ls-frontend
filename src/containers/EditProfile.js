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
import config from "../config";

export default function EditProfile(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isBuyer, setIsBuyer] = useState(false);
    const [isWholesaler, setIsWholesaler] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profileId, setProfileId] = useState("");
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(false);

    useEffect(() => {
        function loadProfile(userId) {
            return API.get("profiles", `/profiles/${userId}`);
          }

    async function onLoad() {
        try {
            const user = await Auth.currentUserInfo();
            console.log(user);
            const profile = await loadProfile(user["id"]);
            console.log(profile);
            setProfileId(profile.profileId);
            setFirstName(profile.firstName);
            setLastName(profile.lastName);
            setPhoneNumber(profile.phoneNumber);
            setBio(profile.bio);
            setIsBuyer(profile.isBuyer);
            setIsWholesaler(profile.isWholesaler);
            setImage(profile.image);
            console.log(profile.image);
        } catch (e) {
            alert(e);
        }
        }

        onLoad();
    }, [props.match.params.id]);


    function validateForm() {
      return (
          // email.length > 5 &&
          // password.length > 5 &&
          firstName.length > 1 &&
          lastName.length > 1
        );
    }

    function saveProfile(profile) {
        return API.put("profiles", `/profiles/${props.match.params.id}`, {
            body: profile,
        });
    }

    function handleFileChange(event) {
        setFile(event.target.files[0]);
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
            const newImage = file ? await s3Upload(file) : image;
            console.log(newImage);
            await saveProfile({
                profileId,
                firstName,
                lastName,
                phoneNumber,
                bio,
                isBuyer,
                isWholesaler,
                image: newImage,
            });
            setIsLoading(false);
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    function formatFilename(str) {
      return str.replace(/^\w+-/, "");
    }

    async function handleLogout(event) {
      await Auth.signOut();
      props.history.push("/login");
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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={6}>
                    <FormGroup controlId="lastName" bsSize="large">
                      <ControlLabel>Last Name</ControlLabel>
                      <FormControl
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup controlId="phoneNumber" bsSize="large">
                  <ControlLabel>Phone Number</ControlLabel>
                  <FormControl
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </FormGroup>
                {image && (
                <FormGroup>
                  <ControlLabel>Image</ControlLabel>
                  <FormControl.Static>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://${config.s3.BUCKET}.s3.amazonaws.com/public/${image}`}
                      className="pull-left"
                    >
                      {formatFilename(image)}
                    </a>
                  </FormControl.Static>
                </FormGroup>
              )}
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

                <LoaderButton
                className="btn-primary"
                onClick={handleLogout}
                bsSize="large"
                >
                  Logout
                </LoaderButton>
              </form>
              
            ) : (
                <Loading />
            )}
        </div>
            
    )
}