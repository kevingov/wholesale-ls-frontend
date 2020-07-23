import "./ViewProperty.css";

import { Col, Row, Jumbotron } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from "reactstrap";

import { API } from "aws-amplify";

export default function ViewProperty(props) {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function loadProperty() {
      return API.get("properties", `/properties/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const property = await loadProperty();

        setProperty(property);
        setIsLoading(true);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);







  function renderProperty() {
    return (
      <div>
      <div className="lander">
            <Jumbotron>
            </Jumbotron>
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
    )
  }




  return (
    <div className="ViewProperty container">
      {isLoading ? (
        
       
        // Why can't we put div container here?        

        // <Row>
        //   <Col sm={12}>
        //     <img>

        //     </img>
        //     <p>
        //       <b>{property.title} </b>
        //     </p>
        //     <p>{property.description}</p>
        //   </Col>
        // </Row>

        renderProperty()



      ) : null}
    </div>
  );
}
