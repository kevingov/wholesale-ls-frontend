import React from "react";
import { Col, Row, ControlLabel, FormControl, FormGroup, } from "react-bootstrap";


const Comparables = ({ setForm, formData, navigation }) => {
    const { whyThisProperty, propertyNeeds, comparableProperties } = formData;
  
    const { previous, next } = navigation;

    return (
        <div className="MultiForm container">
          <div className="MultiForm-Title">
            <h1>Comparables</h1>
            <h2>Please add a title and description</h2>
          </div>
          <Row>
            <Col xs={2}>
            </Col>
            <Col xs={8}>
              <FormGroup controlId="whyThisProperty">
                <ControlLabel>Why This Property</ControlLabel>
                    <FormControl
                        value={whyThisProperty}
                        componentClass="textarea"
                        onChange={setForm}
                        name="whyThisProperty"
                        />
                </FormGroup>

                <FormGroup controlId="propertyNeeds">
                <ControlLabel>Property Needs</ControlLabel>
                    <FormControl
                        value={propertyNeeds}
                        componentClass="textarea"
                        placeholder="I.e. $30k under Market Value"
                        onChange={setForm}
                        name="propertyNeeds"
                        />
                </FormGroup>

                <FormGroup controlId="comparableProperties">
                <ControlLabel>Comparable Properties</ControlLabel>
                    <FormControl
                        value={comparableProperties}
                        componentClass="textarea"
                        placeholder="94 Armstrong St."
                        onChange={setForm}
                        name="comparableProperties"
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
    
    export default Comparables;
