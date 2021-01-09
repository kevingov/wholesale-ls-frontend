import React from "react";
import { Col, Row, ControlLabel, FormControl, FormGroup, } from "react-bootstrap";
import Dropdown from "react-dropdown";


const PropertyDetail = ({ setForm, formData, navigation }) => {
    const { propertyType, propertyStatus, bedrooms, bathrooms, parking, description } = formData;
  
    const { previous, next } = navigation;

    return (
        <div className="MultiForm container">
          <div className="MultiForm-Title">
            <h1>Property Detail</h1>
            <h2>Please add a title and description</h2>
          </div>
          <Row>
            <Col xs={2}>
            </Col>
            <Col xs={8}>
              <Col xs={6}>
              
                <FormGroup controlId="propertyType">
                  <ControlLabel>Property Type</ControlLabel>
                  <Dropdown
                          value={propertyType}
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
                          type="dropdown"
                          onChange={setForm}
                          name="propertyType"
                          />
                  </FormGroup>
                </Col>
                <Col xs={6}>
                  <FormGroup controlId="propertyStatus">
                    <ControlLabel>Property Status</ControlLabel>
                        <Dropdown
                            options={[
                              {
                                label: "Active",
                                value: "Active",
                              },
                              {
                                label: "Pending",
                                value: "Pending",
                              },
                              {
                                label: "Assigned",
                                value: "Assigned",
                              },
                            ]}
                            type="text"
                            onChange={setForm}
                            name="propertyStatus"
                            />
                  </FormGroup>
                </Col>
                <Col xs={4}>
                  <FormGroup controlId="bedrooms">
                    <ControlLabel>Bedrooms</ControlLabel>
                        <FormControl
                            value={bedrooms}
                            type="text"
                            placeholder="I.e. $30k under Market Value"
                            onChange={setForm}
                            name="bedrooms"
                            />
                  </FormGroup>
                </Col>
                <Col xs={4}>
                  <FormGroup controlId="bathrooms">
                    <ControlLabel>Bathrooms</ControlLabel>
                        <FormControl
                            value={bathrooms}
                            type="text"
                            placeholder="94 Armstrong St."
                            onChange={setForm}
                            name="bathrooms"
                            />
                  </FormGroup>
                </Col>
                <Col xs={4}>
                  <FormGroup controlId="parking">
                    <ControlLabel>Parking</ControlLabel>
                        <FormControl
                            value={parking}
                            type="text"
                            placeholder="94 Armstrong St."
                            onChange={setForm}
                            name="parking"
                            />
                  </FormGroup>
                </Col>
               
                  <FormGroup controlId="description">
                    <ControlLabel>Description</ControlLabel>
                        <FormControl
                            value={description}
                            componentClass="textarea"
                            placeholder="94 Armstrong St."
                            onChange={setForm}
                            name="description"
                            />
                  </FormGroup>
                
              </Col>
              <Col xs={2}>
              </Col>
            </Row>

          <Col xs={9}>
          </Col>
          <Col xs={2}>
          <div>
            <button onClick={previous}>Previous</button>
            <button className="secondary-btn" onClick={next}>Next</button>
          </div>
          </Col>
          <Col xs={1}>
          </Col>
        </div>
      );
    };
    
    export default PropertyDetail;
