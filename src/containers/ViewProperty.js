import "./ViewProperty.css";

import { API, Auth } from "aws-amplify";
import { Col, Modal, Row, Breadcrumb } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import Loading from "./Loading";
import Sticky from "react-stickynode";
import config from "../config";

export default function ViewProperty(props) {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [propertyOwner, setPropertyOwner] = useState(false);
  const [profile, setProfile] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [viewCreateAccountModal, setViewCreateAccountModal] = useState(null);
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
        const property = await loadProperty();
        console.log(property);
        const profile = await loadProfile(property.userId);
        setProfile(profile);
        setPropertyOwner(userId === property.userId);
        setProperty(property);
        setIsLoading(true);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  async function sendPropertyEmail() {
    await sendEmail({
      buyerEmail: userEmail,
      wholesalerEmail: profile.email,
      propertyTitle: property.title,
      buyerFirstName: "test",
      propertyInfo: property.tagline,
      wholesalerFirstName: profile.firstName,
    });
    setInfoSent(true);
  }

  function sendEmail(info) {
    console.log(info);
    return API.post("properties", "/propertyemail", {
      body: info,
    });
  }

  return (
    <div className="Index">
      <div className="Breadcrumbs">
        <div className="Breadcrumbs-items container">
          <Breadcrumb>
            <Breadcrumb.Item href="/properties">Properties</Breadcrumb.Item>
            <Breadcrumb.Item active>View Property</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    <div className="ViewProperty">
      <div className="container">
      <div className="ViewProperty-Wrapper">
      {isLoading ? (
        <div>
          <Row>
            <Col sm={7}>
              {propertyOwner ? (
                <div>
                  <a
                    href={`/properties/${property.propertyId}/edit`}
                    className="other-btn"
                  >
                    Edit Property
                  </a>
                  <br />
                  <br />
                </div>
              ) : null}

              <div className="Back-Link">
                <a href={`/properties`}>
                    Back to List
                </a>
              </div>

              <div className="Price">
                <p>$ {property.price}</p>
              </div>


              <div className="ViewProperty-Title">
                <h1>{property.title}</h1>
                <p>
                  {property.address}
                </p>
              </div>

              <Row className="Row-Highlights">
                      <Col xs={3} className="ViewProperty-Highlights">
                        <p> {property.bedroom} Bedrooms</p>
                      </Col>
                      <Col xs={3} className="ViewProperty-Highlights">
                        <p> {property.bathroom} Bathrooms</p>
                      </Col>
                      <Col xs={3} className="ViewProperty-Highlights">
                        <p> {property.propertyType} </p>
                      </Col>
                      <Col xs={3} className="ViewProperty-Highlights">
                        <p> {property.city} </p>
                      </Col>
              </Row>
              

              

              <div className="ViewProperty-Details">
                <h2>Property Details</h2>
                <hr />
                <p>{property.description}</p>
                <br />
                <br />
              <Row>
                <Col sm={6}>
                  <h3>Bedrooms</h3>
                  <h3>Bathrooms</h3>
                  <h3>Parking Type</h3>
                  <h3>Building Type</h3>
                </Col>
                <Col sm={6}>
                  <br />
                  <p>{property.bedroom}</p>
                  <p>{property.bathroom}</p>
                  <p>{property.parking}</p>
                  <p>{property.propertyType}</p>
                </Col>
              </Row>
                <br />
                <br />

                <h2>Why this Property?</h2>
                <p>{property.whyThisProperty}</p>
                <br />
                <h2>Comparables</h2>
                <p>{property.comparable}</p>
              </div>
            </Col>
            {/* <Col sm={1}></Col> */}
            <Col sm={5}>

              <div
                style={{
                  backgroundImage: `url(https://${config.s3.BUCKET}.s3.amazonaws.com/public/${property.image})`,
                  backgroundSize: "cover",
                  height: "344px",
                  width: "515px",
                  borderRadius: "5px",
                  marginBottom: "5px",
                  marginTop: "24px",
                  // marginLeft: "-78px",
                }}
                className="propertyImage"
              ></div>

              <Sticky top="#header" bottomBoundary="#content">
                <div id="#card" className="contactCard">
                  <p>
                    <img
                      alt={`${profile.firstName} ${profile.lastName}'s profile logo`}
                      src={`https://${config.s3.BUCKET}.s3.amazonaws.com/public/${profile.image}`}
                    />
                  </p>
                  <p>
                    <b>
                      {property.propertyType} posted by {profile.firstName}{" "}
                      {profile.lastName}
                    </b>
                  </p>
                  <p>{profile.bio}</p>
                  <br />
                  {infoSent ? (
                    <p>info is sent</p>
                  ) : (
                    <p>
                      {userEmail ? (
                        <button
                          className="secondary-btn"
                          onClick={() => sendPropertyEmail()}
                        >
                          Contact {profile.firstName} {profile.lastName}
                        </button>
                      ) : (
                        <button
                          className="secondary-btn"
                          onClick={() => setViewCreateAccountModal(true)}
                        >
                          Contact {profile.firstName} {profile.lastName}
                        </button>
                      )}
                    </p>
                  )}
                </div>
              </Sticky>
            </Col>
          </Row>
        </div>
      ) : (
        <Loading />
      )}
      <Modal
        show={viewCreateAccountModal}
        onHide={() => setViewCreateAccountModal(false)}
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <div className="modal-card text-center">
            <h1>create account first</h1>
            <p>
              You'll have to create an account to get more info on this property
            </p>
            <a
              alt="create account btn"
              className="secondary-btn"
              href="/signup"
            >
              Create an account
            </a>
          </div>
        </Modal.Body>
      </Modal>
          
        </div>
      </div>
    </div>
    </div>
  );
}
