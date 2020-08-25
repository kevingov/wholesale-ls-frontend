import "./Properties.css";

import {
  Col,
  ControlLabel,
  FormGroup,
  Row,
} from "react-bootstrap";
import Dropdown from "react-dropdown";
import React, { useEffect, useState } from "react";

import { API } from "aws-amplify";
import Loading from "./Loading";
import config from "../config";

export default function Properties(props) {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterPropertyType, setFilterPropertyType] = useState("");
  // const [filterPropertyStatus, setFilterPropertyStatus] = useState("");

  useEffect(() => {
    async function onLoad() {
      try {
        const properties = await loadProperties();
        console.log(properties);
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

  function updateFilterPropertyType(filterPropertyType) {
    setFilterPropertyType(filterPropertyType);
  }

  return (
    <div className="Properties container">
      {!isLoading ? (
        <Row>
          <div className="Filters">
            <Row>
              <Col xs={3}>
                <FormGroup controlId="filterPropertyType">
                        <ControlLabel>Property Type</ControlLabel>
                        <br />
                        <br />
                        <Dropdown
                          value={filterPropertyType}
                          options={[
                            {
                              label: "Detached",
                              value: "Detached",
                            },
                            {
                              label: "Semi-Detached",
                              value: "Semi-Detached",
                            },
                            {
                              label: "Townhome",
                              value: "Townhome",
                            },
                            {
                              label: "Condo",
                              value: "Condo",
                            },
                            {
                              label: "Multi-family",
                              value: "Multi-family",
                            },
                          ]}
                          onChange={updateFilterPropertyType}
                        />
                        <br />
                        <br />
                </FormGroup>
              </Col>
              {/* <Col xs={3}>
                <FormGroup controlId="filterPropertyStatus">
                        <ControlLabel>Property Type</ControlLabel>
                        <br />
                        <br />
                        <Dropdown
                          value={filterPropertyStatus}
                          options={[
                            {
                              label: "Detached",
                              value: "Detached",
                            },
                            {
                              label: "Semi-Detached",
                              value: "Semi-Detached",
                            },
                            {
                              label: "Townhome",
                              value: "Townhome",
                            },
                            {
                              label: "Condo",
                              value: "Condo",
                            },
                            {
                              label: "Multi-family",
                              value: "Multi-family",
                            },
                          ]}
                          onChange={updateFilterPropertyType}
                        />
                        <br />
                        <br />
                </FormGroup>
              </Col> */}
            </Row>
          </div>
          {properties
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((property, i) => (
              <Col key={i} sm={4}>
                <a href={`/properties/${property.propertyId}`}>
                  <div className="property">
                    <div
                      style={{
                        backgroundImage: `url(https://${config.s3.BUCKET}.s3.amazonaws.com/public/${property.image})`,
                        backgroundSize: "cover",
                        height: "200px",
                        borderRadius: "5px",
                        marginBottom: "5px",
                      }}
                      className="propertyImage"
                    ></div>
                    <p>
                      <b>
                        {property.propertyType} &middot; {property.city}
                      </b>
                    </p>
                    <p>
                      {property.title.length > 45
                        ? property.title.slice(0, 45) + " ..."
                        : property.title}
                    </p>
                  </div>
                </a>
                <br />
                <br />
              </Col>
            ))}
        </Row>
      ) : (
        <Loading />
      )}
    </div>
  );
}
