import "./ViewProperty.css";

import { API, Auth } from "aws-amplify";
import { Col, Modal, Row } from "react-bootstrap";
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
    <div className="ViewProperty container">
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

              <div className="Price">
                <p>$ {property.price}</p>
              </div>


              <div className="title">
                <h1>{property.title}</h1>
                <p>
                  <b>${property.price}</b> &middot; {property.address}
                </p>
              </div>
              <div
                style={{
                  backgroundImage: `url(https://${config.s3.BUCKET}.s3.amazonaws.com/public/${property.image})`,
                  backgroundSize: "cover",
                  height: "300px",
                  borderRadius: "5px",
                  marginBottom: "5px",
                  marginTop: "24px",
                }}
                className="propertyImage"
              ></div>
              <div className="highlights-container">
                <h3>{property.tagline}</h3>
                <p>
                  {property.bedroom} Bedrooms &middot; {property.bathroom}{" "}
                  Bathrooms &middot; {property.parking} Parking
                </p>
                <hr />
                <p>{property.description}</p>
                <br />
                <h3>Why this Property?</h3>
                <p>{property.whyThisProperty}</p>
                <br />
                <h3>Comparables</h3>
                <p>{property.comparable}</p>
              </div>
            </Col>
            <Col sm={1}></Col>
            <Col sm={4}>
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
  );
}
