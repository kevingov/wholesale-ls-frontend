import React from "react";
import { Col, Row, Breadcrumb, ControlLabel, FormControl, FormGroup, } from "react-bootstrap";
import "./MultiForm.css";



const BasicInfo = ({ setForm, formData, navigation }) => {
    const { title, tagline, address } = formData;
  
    const { next } = navigation;

    return (
        <div className="MultiForm container">
            <Row xs={4}>
            </Row>
            <Row xs={4}>
            </Row>
           <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
                <FormControl
                    value={title}
                    type="text"
                    placeholder="Beautiful detached house in downtown London"
                    onChange={(e) => setForm(e.target.value)}
                    />
            </FormGroup>

            <FormGroup controlId="tagline">
             <ControlLabel>Tagline</ControlLabel>
                <FormControl
                    value={tagline}
                    type="text"
                    placeholder="I.e. $30k under Market Value"
                    onChange={setForm}
                    />
            </FormGroup>

            <FormGroup controlId="address">
             <ControlLabel>Address</ControlLabel>
                <FormControl
                    value={address}
                    type="text"
                    placeholder="94 Armstrong St."
                    onChange={setForm}
                    />
            </FormGroup>

            <Row xs={4}>
            </Row>
            
          <div>
            <button onClick={next}>Next</button>
          </div>
        </div>
      );
    };
    
    export default BasicInfo;
