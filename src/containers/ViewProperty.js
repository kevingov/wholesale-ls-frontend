import "./ViewProperty.css";

import { API, Auth } from "aws-amplify";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Col, Jumbotron, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import Loading from "./Loading";

export default function ViewProperty(props) {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [propertyOwner, setPropertyOwner] = useState(false);

  useEffect(() => {
    function loadProperty() {
      return API.get("properties", `/properties/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const user = await Auth.currentUserInfo();
        const userId = user["id"];
        const property = await loadProperty();
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
                href={`/properties/${property.slug}/edit`}
                className="other-btn"
              >
                Edit Property
              </a>
              <br />
              <br />
            </div>
          ) : null}
          <div className="lander">
            <Jumbotron></Jumbotron>
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
                <Card>
                  <CardBody>
                    <CardTitle>Toronto</CardTitle>
                    {/* <CardText tag="p">
                          Automatically create a Drip Campagin of emails/messages designed to start Conversations.
                        </CardText> */}
                    {/* <Button variant="primary">See Properties</Button> */}
                  </CardBody>
                </Card>
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
