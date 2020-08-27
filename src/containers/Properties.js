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

  const filterDropdown = properties.filter(function(result) {
    return result.propertyType === filterPropertyType;
  });

  return (
    <div className="Index">
    <div className="All-Properties container">
      {!isLoading ? (
        <Row>
          <div className="Filters">
            <Row>
              <Col xs={3}>
                <FormGroup controlId="filterPropertyType">
                        <br />
                        <Dropdown
                          placeholder="Search"
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
              <Col xs={1}>
              </Col>
              <Col xs={2}>
              <FormGroup controlId="filterPropertyType">
                        <br />
                        <Dropdown
                          placeholder="Property Types"
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
              <Col xs={2}>
                <FormGroup controlId="filterPropertyType">
                          <br />
                          <Dropdown
                            placeholder="Bedrooms"
                            value={filterPropertyType}
                            options={[
                              {
                                label: "Any",
                                value: "Any",
                              },
                              {
                                label: "2+",
                                value: "2+",
                              },
                              {
                                label: "3+",
                                value: "3+",
                              },
                              {
                                label: "4+",
                                value: "4+",
                              },
                            ]}
                            onChange={updateFilterPropertyType}
                          />
                          <br />
                          <br />
                </FormGroup>
              </Col>
              <Col xs={2}>
                <FormGroup controlId="filterPropertyType">
                          <br />
                          <Dropdown
                            placeholder="Bathrooms"
                            value={filterPropertyType}
                            options={[
                              {
                                label: "Any",
                                value: "Any",
                              },
                              {
                                label: "2+",
                                value: "2+",
                              },
                              {
                                label: "3+",
                                value: "3+",
                              },
                              {
                                label: "4+",
                                value: "4+",
                              },
                            ]}
                            onChange={updateFilterPropertyType}
                          />
                          <br />
                          <br />
                </FormGroup>
              </Col>
              <Col xs={2}>
              <FormGroup controlId="filterPropertyType">
                        <br />
                        <Dropdown
                          placeholder="Sort By"
                          value={filterPropertyType}
                          options={[
                            {
                              label: "Newest",
                              value: "Newest",
                            },
                            {
                              label: "Oldest",
                              value: "Oldest",
                            },
                            {
                              label: "Price High-Low",
                              value: "Price High-Low",
                            },
                            {
                              label: "Price Low-High",
                              value: "Price Low-High",
                            },
                          ]}
                          onChange={updateFilterPropertyType}
                        />
                        <br />
                        <br />
                </FormGroup>
              </Col>
            </Row>
          </div>
          {properties
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((property, i) => (
              <Col key={i} sm={4}>
                <a href={`/properties/${property.propertyId}`}>
                  <div className="Property">
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
                    <div className="Property-Title">
                      <p>
                          {property.title.length > 45
                          ? property.title.slice(0, 45) + " ..."
                          : property.title}
                      </p>
                    </div>
                    {/* <p>
                        {property.propertyType} &middot; {property.city}
                    </p> */}
                    
                      <div className="Price">
                        <p>$ {property.price}</p>
                      </div>
                    
                    
                    <Row className="Row-Highlights">
                      <Col xs={3} className="Property-Highlights">
                        <p> {property.bedroom} Bedrooms</p>
                      </Col>
                      <Col xs={3} className="Property-Highlights">
                        <p> {property.bathroom} Bathrooms</p>
                      </Col>
                      <Col xs={3} className="Property-Highlights">
                        <p> {property.propertyType} </p>
                      </Col>
                      <Col xs={3} className="Property-Highlights">
                        <p> {property.city} </p>
                      </Col>
                    </Row>
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
    </div>
  );
}
