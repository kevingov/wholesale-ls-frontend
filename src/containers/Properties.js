import "./Properties.css";

import {
  Col,
  FormGroup,
  Row,
  Breadcrumb,
  // FormControl,
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
  const [filterBedrooms, setFilterBedrooms] = useState("");
  const [filterBathrooms, setFilterBathrooms] = useState("");
  const [filterSort, setFilterSort] = useState("");
  // const [filter, setFilter] = useState('');

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

  // const updateFilter = event => {
  //   setFilter(event.value);
  //   console.log(event.value);
  // }

  const updateFilterPropertyType = event => {
    setFilterPropertyType(event.value);
  }

  const updateFilterBedrooms = event => {
    setFilterBedrooms(event.value);
  }

  const updateFilterBathrooms = event => {
    setFilterBathrooms(event.value);
  }

  const updateFilterSort = event => {
    setFilterSort(event.value);
  }

  
  const filterDropdown = properties.filter( results => {                              
    return results.propertyType === filterPropertyType
        // && results.bedroom === filterBedrooms
        // && results.bathroom === filterBathrooms
    });

  // const filterBathroom = filterDropdown.filter( results => {
  //   return results.bathroom === filterBathrooms
  //   });

  // const filterBedroom = filterBathroom.filter( results => {
  //   return results.bedroom === filterBedrooms
  //   });

  // const filter = [filterPropertyType, filterBathrooms, filterBedrooms]

  // const filteredProperties = properties.filter(function(result) {
  //   for (var key in filter) {
  //     for (var key2 in key) {
  //       if (result[key2] === undefined || result[key2] !== filter[key2])
  //       return false;
  //   }}
  //   return true;
  // });


  return (
    <div className="Index">
    <div className="Breadcrumbs">
      <div className="Breadcrumbs-items container">
        <Breadcrumb>
          <Breadcrumb.Item active>Properties</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
    <div className="All-Properties container">
      {!isLoading ? (
        <Row>
            <Row className="Filters">
              <Col xs={3}>
                <FormGroup controlId="filterPropertyType">
                        <br />
                        {/* <FormControl 
                          type="text" 
                          placeholder="Search" 
                          onChange={ e => setFilter(e.target.value)}>
                        </FormControl> */}
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
                <FormGroup controlId="filterBedrooms">
                          <br />
                          <Dropdown
                            placeholder="Bedrooms"
                            value={filterBedrooms}
                            options={[
                              {
                                label: "Any",
                                value: "1",
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
                            onChange={updateFilterBedrooms}
                          />
                          <br />
                          <br />
                </FormGroup>
              </Col>
              <Col xs={2}>
                <FormGroup controlId="filterBathrooms">
                          <br />
                          <Dropdown
                            placeholder="Bathrooms"
                            value={filterBathrooms}
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
                            onChange={updateFilterBathrooms}
                          />
                          <br />
                          <br />
                </FormGroup>
              </Col>
              <Col xs={2}>
              <FormGroup controlId="filterSort">
                        <br />
                        <Dropdown
                          placeholder="Sort By"
                          value={filterSort}
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
                          onChange={updateFilterSort}
                        />
                        <br />
                        <br />
                </FormGroup>
              </Col>
            </Row>

              {filterDropdown.map((property, i) => (
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

Everything Above here should be a filter

                    <br />
                    <br />
            




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
