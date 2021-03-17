import "./PropertyChat.css";

import { API, Auth } from "aws-amplify";
import { Modal, Breadcrumb, Form, FormControl, FormGroup, ControlLabel } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import { Redirect } from 'react-router-dom';

import Loading from "./Loading";
import config from "../config";
import backArrowIcon from "../assets/back-icon.png";
import mapPinIcon from "../assets/map-pin-icon.png";
// import Slider from "../components/Slider";
import Popup from 'react-popup';

export default function EmailPage(props) {
    const [email, setEmail] = useState(null);
    const [message, setMessage] = useState(null);
    const [subject, setSubject] = useState(null);
    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [propertyOwner, setPropertyOwner] = useState(false);
    const [profile, setProfile] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [user, setUser] = useState(null);
    const [infoSent, setInfoSent] = useState(false);

    useEffect(() => {
        function loadProperty() {
            return API.get("properties", `/properties/${props.match.params.id}`);
        }

        function loadProfile(userId) {
            return API.get("profiles", `/profiles/${userId}`);
        }
        async function onLoad() {
            try {
                const user = await Auth.currentUserInfo();
                let userId = "none";
                if (user) userId = user["id"];
                if (user) setUserEmail(user.attributes.email);
                if (user) setUser(user);
                console.log("here is current user");
                console.log(user);
                const property = await loadProperty();
                console.log("property is below");
                console.log(property);
                const profile = await loadProfile(property.userId);
                setProfile(profile);
                setPropertyOwner(userId === property.userId);
                setProperty(property);
                setIsLoading(true);
                console.log("profile is below");
                console.log(profile);
            } catch (e) {
                alert(e);
            }
        }

        onLoad();
    }, [props.match.params.id]);

    async function sendPropertyEmail() {
        try {
        const res = await sendEmail({
            buyerEmail: user.attributes.email,
            wholesalerEmail: profile.email,
            propertyTitle: property.title,
            buyerFirstName: user.attributes.given_name,
            propertyInfo: property.tagline,
            wholesalerFirstName: profile.firstName,
            message: message,
        });
        } catch (e) {
            console.log(e);
        };
        console.log("hey is this working after sendEmail");
        alert("Your Email has been sent to the Wholesaler");
        props.history.push("/properties");
        setInfoSent(true);

    }

    function sendEmail(info) {
        // console.log(info);
        return API.post("properties", "/propertyemail", {
            body: info,
        });
    }

    return (
        <div className='Index'>
            <div className='Breadcrumbs'>
                <div className='Breadcrumbs-items container'>
                    <Breadcrumb>
                        <Breadcrumb.Item href='/properties'>Properties</Breadcrumb.Item>
                        <Breadcrumb.Item active>View Property</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <div className='ViewProperty'>
                <div className='container'>
                    <div className='ViewProperty__Wrapper'>
                        <h1>Compose an Email to {profile && profile.firstName} {profile && profile.lastName}</h1>
                        <p>Email Subject will be: '{property && property.title}'</p>
                        {/* <FormGroup controlId="Subject" bsSize="large">
                            <ControlLabel>Subject</ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </FormGroup> */}
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>Message</ControlLabel>
                            <FormControl
                                autoFocus
                                componentClass="textarea"
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </FormGroup>
                        {/* <a href={`/properties/${props.match.params.id}`}> */}
                            <button
                                className='ViewPropertyCard__ContactButton secondary-btn'
                                onClick={sendPropertyEmail}
                            >
                                Send Email
                            </button>
                        {/* </a> */}
                    </div>
                </div>
            </div>

        </div>
    )
}