// import "./Properties.css";

import { Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import { API } from "aws-amplify";
import Loading from "./Loading";

export default function Properties(props) {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      try {
        const properties = await loadProperties();
        setProperties(properties);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadProperties() {
    return API.get("properties", "/properties");
  }

  return (
    <div className="Properties container">
      {!isLoading ? (
        <Row>
          {properties.map((property, i) => (
            <Col key={i} xs={4}>
              <a href={`/properties/${property.propertyId}`}>
                <div className="property">
                  <h3>{property.title}</h3>
                  <p>{property.tagline}</p>
                </div>
              </a>
            </Col>
          ))}
        </Row>
      ) : (
        <Loading />
      )}
    </div>
  );
}
