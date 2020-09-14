import "./Properties.css";

import {
  Col,
  FormGroup,
  Row,
  Breadcrumb,
  FormControl,
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
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    async function onLoad() {
      try {
        const properties = await loadProperties();
        setProperties(properties);
        setFilterBedrooms(0);
        setFilterBathrooms(0);
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
  
  const resultsFilteredByDropdown = properties.filter(results => {         
    console.log(filterPropertyType);
    if (filterPropertyType === "") {
      return results
    } else {
      return (results.propertyType === filterPropertyType
        && results.bedroom > filterBedrooms
        && results.bathroom > filterBathrooms)
    }
  });

  let sortedProperties;
  if (filterSort === "Newest") {
    sortedProperties = resultsFilteredByDropdown.sort((a, b) => b.createdAt - a.createdAt)
  } else if (filterSort === "Oldest") {
    sortedProperties = resultsFilteredByDropdown.sort((a, b) => a.createdAt - b.createdAt)
  } else if (filterSort === "Price High-Low") {
    sortedProperties = resultsFilteredByDropdown.sort((a, b) => Number(a.price) - Number(b.price)) 
  } else {
    sortedProperties = resultsFilteredByDropdown.sort((a, b) => Number(b.price) - Number(a.price))
  }

  // let searchProperties;
  // if (filterText === "") {
  //   searchProperties = sortedProperties
  // } else {
  //   searchProperties = sortedProperties.filter(results => {
  //     return results.title.toLowerCase().includes( filterText.toLowerCase() )
  //   })
  // }
  
  const searchProperties = sortedProperties.filter(results => {
    return results.title.toLowerCase().includes( filterText.toLowerCase() )
  })

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
                  <FormControl 
                    type="text" 
                    placeholder="Search" 
                    onChange={ e => setFilterText(e.target.value)}>
                  </FormControl>
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
                        value: 0,
                      },
                      {
                        label: "2+",
                        value: 2,
                      },
                      {
                        label: "3+",
                        value: 3,
                      },
                      {
                        label: "4+",
                        value: 4,
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
                        value: 0,
                      },
                      {
                        label: "2+",
                        value: 2,
                      },
                      {
                        label: "3+",
                        value: 3,
                      },
                      {
                        label: "4+",
                        value: 4,
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

            {searchProperties 
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


            




            {/* {properties
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
          ))} */}
        </Row>
      ) : (
        <Loading />
      )}
    </div>
    </div>
  );
}
