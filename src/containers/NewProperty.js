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
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [parking, setParking] = useState("");
  const [netOperatingIncome, setNetOperatingIncome] = useState("");
  const [canCrowdFund, setCanCrowdFund] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createProperty({});
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
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="firstFollowUpText">
              <ControlLabel>Title</ControlLabel>
              <FormControl
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>

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
        </Col>
      </Row>
    </div>
  );
}
