import React from "react";
import { Col, Row, ControlLabel, FormControl, FormGroup, } from "react-bootstrap";
import DatePicker from "react-datepicker";


const Price = ({ setForm, formData, navigation }) => {
    const { offerDate, closeDate, groupShowingDate, price, nearbyPrice, arvPrice } = formData;
  
    const { previous, next } = navigation;

    return (
        <div className="MultiForm container">
          <div className="MultiForm-Title">
            <h1>Price and Dates</h1>
            <h2>Please add a title and description</h2>
          </div>
          <Col xs={2}>
            </Col>
            <Col xs={8}>
            <Row>
                <Col xs={4}>
                  <FormGroup controlId="offerDate">
                    <ControlLabel>Offer Date</ControlLabel>
                        <DatePicker className="AutoComplete"
                            selected={offerDate}
                            onChange={setForm}
                            name="offerDate"
                            dateFormat="MMMM d, yyyy"
                            />
                  </FormGroup>
                </Col>
                <Col xs={4}>
                  <FormGroup controlId="closeDate">
                    <ControlLabel>Close Date</ControlLabel>
                        <DatePicker className="AutoComplete"
                            selected={closeDate}
                            onChange={setForm}
                            name="closeDate"
                            dateFormat="MMMM d, yyyy"
                            />
                  </FormGroup>
                </Col>
                <Col xs={4}>
                  <FormGroup controlId="groupShowingDate">
                    <ControlLabel>Group Showing Date</ControlLabel>
                        <DatePicker className="AutoComplete"
                            selected={groupShowingDate}
                            onChange={setForm}
                            name="groupShowingDate"
                            dateFormat="MMMM d, yyyy"
                            />
                  </FormGroup>
                </Col>
            </Row>
            <Row>
          <Col xs={4}>
                  <FormGroup controlId="price">
                    <ControlLabel>Price</ControlLabel>
                        <FormControl
                            value={price}
                            type="text"
                            placeholder="I.e. $30k under Market Value"
                            onChange={setForm}
                            name="price"
                            />
                  </FormGroup>
                </Col>
                <Col xs={4}>
                  <FormGroup controlId="nearbyPrice">
                    <ControlLabel>Nearby Price</ControlLabel>
                        <FormControl
                            value={nearbyPrice}
                            type="text"
                            placeholder="94 Armstrong St."
                            onChange={setForm}
                            name="nearbyPrice"
                            />
                  </FormGroup>
                </Col>
                <Col xs={4}>
                  <FormGroup controlId="arvPrice">
                    <ControlLabel>After Repair Value Price</ControlLabel>
                        <FormControl
                            value={arvPrice}
                            type="text"
                            placeholder="94 Armstrong St."
                            onChange={setForm}
                            name="arvPrice"
                            />
                  </FormGroup>
                </Col>
            </Row>
            </Col>
            <Col xs={2}>
            </Col>

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
    
    export default Price;
