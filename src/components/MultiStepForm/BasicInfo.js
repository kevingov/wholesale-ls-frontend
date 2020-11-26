import React from "react";
import { Col, Row, ControlLabel, FormControl, FormGroup, } from "react-bootstrap";
import "./MultiForm.css";



const BasicInfo = ({ setForm, formData, navigation }) => {
    const { title, tagline, address } = formData;
  
    const { next } = navigation;

    return (
        <div className="MultiForm container">
          <div className="MultiForm-Title">
            <h1>Basic Info</h1>
            <h2>Please add a title and description</h2>
          </div>
          <Row>
          <Col xs={2}>
          </Col>

          <Col xs={8}>
           <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
                <FormControl
                    value={title}
                    type="text"
                    placeholder="Beautiful detached house in downtown London"
                    onChange={setForm}
                    name="title"
                    />
            </FormGroup>

            <FormGroup controlId="tagline">
             <ControlLabel>Tagline</ControlLabel>
                <FormControl
                    value={tagline}
                    type="text"
                    placeholder="I.e. $30k under Market Value"
                    onChange={setForm}
                    name="tagline"
                    />
            </FormGroup>

            <FormGroup controlId="address">
             <ControlLabel>Address</ControlLabel>
                <FormControl
                    value={address}
                    type="text"
                    placeholder="94 Armstrong St."
                    onChange={setForm}
                    name="address"
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
            <button className='secondary-btn' onClick={next}>Next</button>
          </div>
          </Col>
          <Col xs={1}>
          </Col>
        </div>
        
      );
    };
    
    export default BasicInfo;
