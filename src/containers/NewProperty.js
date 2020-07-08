// import "./NewProperty.css";

import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import React, { useState } from "react";

import { API } from "aws-amplify";
import MdArrowForward from "react-ionicons/lib/MdArrowForward";

export default function NewProperty(props) {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [status, setStatus] = useState("");
  const [offerDate, setOfferDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [groupShowingDate, setGroupShowingDate] = useState("");
  const [bedroom, setBedroom] = useState(0);
  const [bathroom, setBathroom] = useState("");
  const [parking, setParking] = useState("");
  const [netOperatingIncome, setNetOperatingIncome] = useState(0);
  const [canCrowdFund, setCanCrowdFund] = useState(true);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return title.length > 5;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createProperty({
        title,
        tagline, 
        city,
        address,
        propertyType,
        status,
        offerDate,
        closeDate,
        groupShowingDate,
        bedroom,
        bathroom,
        parking,
        netOperatingIncome,
        canCrowdFund,
        description,
      });
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function createProperty(property) {
    return API.post("properties", "/properties", {
      body: property,
    });
  }

  return (
    <div className="NewProperty">
      <Row>
        <Col sm={12}>
          <div className="form-wrapper">
            <h1>{city}</h1>
            <form onSubmit={handleSubmit}>
              <FormGroup controlId="title">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  value={title}
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="tagline">
                <ControlLabel>Tagline</ControlLabel>
                <FormControl
                  value={tagline}
                  type="text"
                  onChange={(e) => setTagline(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="city">
                <ControlLabel>City</ControlLabel>
                <FormControl
                  value={city}
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="address">
                <ControlLabel>Address</ControlLabel>
                <FormControl
                  value={address}
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="propertyType">
                <ControlLabel>Property Type</ControlLabel>
                <FormControl
                  value={propertyType}
                  type="text"
                  onChange={(e) => setPropertyType(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="status">
                <ControlLabel>Status</ControlLabel>
                <FormControl
                  value={status}
                  type="text"
                  onChange={(e) => setStatus(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="offerDate">
                <ControlLabel>Offer Date</ControlLabel>
                <FormControl
                  value={offerDate}
                  type="text"
                  onChange={(e) => setOfferDate(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="closeDate">
                <ControlLabel>Close Date</ControlLabel>
                <FormControl
                  value={closeDate}
                  type="text"
                  onChange={(e) => setCloseDate(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="groupShowingDate">
                <ControlLabel>Group Showing Date</ControlLabel>
                <FormControl
                  value={groupShowingDate}
                  type="text"
                  onChange={(e) => setGroupShowingDate(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="bedroom">
                <ControlLabel>Bedrooms</ControlLabel>
                <FormControl
                  value={bedroom}
                  type="number"
                  onChange={(e) => setBedroom(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="bathroom">
                <ControlLabel>Bathrooms</ControlLabel>
                <FormControl
                  value={bathroom}
                  type="text"
                  onChange={(e) => setBathroom(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="address">
                <ControlLabel>Parking</ControlLabel>
                <FormControl
                  value={parking}
                  type="text"
                  onChange={(e) => setParking(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="netOperatingIncome">
                <ControlLabel>Net Operating Income</ControlLabel>
                <FormControl
                  value={netOperatingIncome}
                  type="text"
                  onChange={(e) => setNetOperatingIncome(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="canCrowdFund">
                <ControlLabel>Able to Crowdfund</ControlLabel>
                <FormControl
                  type="checkbox"
                  checked={canCrowdFund}
                  onChange={() => setCanCrowdFund(!canCrowdFund)}
                />
              </FormGroup>

              <FormGroup controlId="description">
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  value={description}
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormGroup>


              <br />
              <button
                className="other-btn pull-right"
                isloading={isLoading}
                type="submit"
                disabled={!validateForm()}
              >
                Create Property
                <MdArrowForward fontSize="16px" />
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
