import React from "react";
import { Col, Row, Breadcrumb, ControlLabel, FormControl, FormGroup, } from "react-bootstrap";


const Comparables = ({ setForm, formData, navigation }) => {
    const { whyThisProperty, propertyNeeds, comparableProperties } = formData;
  
    const { previous, next } = navigation;

    return (
        <div className="form">
           <FormGroup controlId="whyThisProperty">
            <ControlLabel>Why This Property</ControlLabel>
                <FormControl
                    value={whyThisProperty}
                    type="text"
                    onChange={(e) => setForm(e.target.value)}
                    />
            </FormGroup>

            <FormGroup controlId="propertyneeds">
             <ControlLabel>Property Needs</ControlLabel>
                <FormControl
                    value={propertyNeeds}
                    type="text"
                    placeholder="I.e. $30k under Market Value"
                    onChange={setForm}
                    />
            </FormGroup>

            <FormGroup controlId="comparableProperties">
             <ControlLabel>Comparable Properties</ControlLabel>
                <FormControl
                    value={comparableProperties}
                    type="text"
                    placeholder="94 Armstrong St."
                    onChange={setForm}
                    />
            </FormGroup>
            
          <div>
            <button onClick={previous}>Previous</button>
            <button onClick={next}>Next</button>
          </div>
        </div>
      );
    };
    
    export default Comparables;
