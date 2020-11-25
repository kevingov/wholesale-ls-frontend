import React from "react";
import { Col, Row, Breadcrumb, ControlLabel, FormControl, FormGroup, } from "react-bootstrap";


const PropertyDetail = ({ setForm, formData, navigation }) => {
    const { propertyType, propertyStatus, bedrooms, bathrooms, parking, description } = formData;
  
    const { previous, next } = navigation;

    return (
        <div className="form">
           <FormGroup controlId="propertyType">
            <ControlLabel>Property Type</ControlLabel>
                <FormControl
                    value={propertyType}
                    type="text"
                    onChange={(e) => setForm(e.target.value)}
                    />
            </FormGroup>

            <FormGroup controlId="propertyStatus">
            <ControlLabel>Property Status</ControlLabel>
                <FormControl
                    value={propertyStatus}
                    type="text"
                    onChange={(e) => setForm(e.target.value)}
                    />
            </FormGroup>

            <FormGroup controlId="bedrooms">
             <ControlLabel>Bedrooms</ControlLabel>
                <FormControl
                    value={bedrooms}
                    type="text"
                    placeholder="I.e. $30k under Market Value"
                    onChange={setForm}
                    />
            </FormGroup>

            <FormGroup controlId="bathrooms">
             <ControlLabel>Bathrooms</ControlLabel>
                <FormControl
                    value={bathrooms}
                    type="text"
                    placeholder="94 Armstrong St."
                    onChange={setForm}
                    />
            </FormGroup>

            <FormGroup controlId="parking">
             <ControlLabel>parking</ControlLabel>
                <FormControl
                    value={parking}
                    type="text"
                    placeholder="94 Armstrong St."
                    onChange={setForm}
                    />
            </FormGroup>

            <FormGroup controlId="description">
             <ControlLabel>Description</ControlLabel>
                <FormControl
                    value={description}
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
    
    export default PropertyDetail;
