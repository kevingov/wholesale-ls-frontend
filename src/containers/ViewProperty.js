// import "./ViewProperty.css";

import { Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";

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

  return (
    <div className="ViewProperty container">
      {isLoading ? (
        <Row>
          <Col sm={12}>
            <p>
              <b>{property.title} </b>
            </p>
            <p>{property.description}</p>
          </Col>
        </Row>
      ) : null}
    </div>
  );
}
