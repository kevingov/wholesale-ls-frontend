import "./ViewProperty.css";

import { API, Auth } from "aws-amplify";
import { Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import Loading from "./Loading";
import config from "../config";

export default function ViewProperty(props) {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [propertyOwner, setPropertyOwner] = useState(false);
  const [profile, setProfile] = useState(null);

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
        const property = await loadProperty();
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

  return (
    <div className="ViewProperty container">
      {isLoading ? (
        <div>
          {propertyOwner ? (
            <div>
              <br />
              <br />
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
          <div className="lander">
            <img
              alt={property.title}
              src={`https://${config.s3.BUCKET}.s3.amazonaws.com/public/${property.image}`}
            />
          </div>
          <div>
            <Row>
              <Col sm={8}>
                <p>
                  <b>{property.city} </b>
                </p>
                <h1>{property.title}</h1>
                <p>Offer Date is {property.offerDate}</p>
                <p>Closing Date is {property.closeDate}</p>
                <h3>Highlights</h3>
                <p>{property.bedroom} Bedrooms</p>
                <p>{property.bathroom} Bathrooms</p>
                <p>{property.parking} Parking</p>

                <h3>Description</h3>
                <p>{property.description}</p>
              </Col>
              <Col sm={4}>
                <div>{profile.userId}</div>
                <p>
                  {profile.firstName} {profile.lastName}
                </p>
                <p>{profile.bio}</p>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
