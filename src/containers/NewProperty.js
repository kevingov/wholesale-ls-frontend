// import "./NewProperty.css";
import "react-dropdown/style.css";
import "react-datepicker/dist/react-datepicker.css";

import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import React, { useState } from "react";

import { API } from "aws-amplify";
import DatePicker from "react-datepicker";
import Dropdown from "react-dropdown";
import MdArrowForward from "react-ionicons/lib/MdArrowForward";

export default function NewProperty(props) {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [status, setStatus] = useState("");
  const [offerDate, setOfferDate] = useState(new Date());
  const [closeDate, setCloseDate] = useState(new Date());
  const [groupShowingDate, setGroupShowingDate] = useState(new Date());
  const [bedroom, setBedroom] = useState(1);
  const [bathroom, setBathroom] = useState(1);
  const [parking, setParking] = useState(1);
  const [netOperatingIncome, setNetOperatingIncome] = useState(0);
  const [canCrowdFund, setCanCrowdFund] = useState(true);
  const [description, setDescription] = useState("");
  const [propertyNeeds, setPropertyNeeds] = useState("");
  const [whyThisProperty, setWhyThisProperty] = useState("");
  const [comparable, setComparable] = useState("");
  // const [comparableAddress, setComparableAddress] = useState("");
  // const [comparablePrice, setComparablePrice] = useState("");
  // const [comparableBedroom, setComparableBedroom] = useState("");
  // const [comparableBathroom, setComparableBathroom] = useState("");
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
        propertyType: propertyType.value,
        status: status.value,
        offerDate,
        closeDate,
        groupShowingDate,
        bedroom,
        bathroom,
        parking,
        netOperatingIncome,
        canCrowdFund,
        description,
        propertyNeeds,
        whyThisProperty,
        comparable,
        // comparableAddress,
        // comparablePrice,
        // comparableBedroom,
        // comparableBathroom,
      });
      props.history.push("/");
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

  function updateStatus(status) {
    setStatus(status);
  }

  function updatePropertyType(propertyType) {
    setPropertyType(propertyType);
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
                <br />
                <br />
                <Dropdown
                  value={propertyType}
                  options={[
                    {
                      label: "one",
                      value: "one",
                    },
                    {
                      label: "two",
                      value: "two",
                    },
                  ]}
                  onChange={updatePropertyType}
                />
              </FormGroup>

              <FormGroup controlId="status">
                <ControlLabel>Status</ControlLabel>
                <br />
                <br />
                <Dropdown
                  value={status}
                  options={[
                    {
                      label: "cool",
                      value: "cool",
                    },
                    {
                      label: "awesome",
                      value: "awesome",
                    },
                  ]}
                  onChange={updateStatus}
                />
              </FormGroup>

              <FormGroup controlId="offerDate">
                <ControlLabel>Offer Date</ControlLabel>
                <DatePicker
                  selected={offerDate}
                  onChange={(date) => setOfferDate(date)}
                  dateFormat="MMMM d, yyyy"
                />
              </FormGroup>

              <FormGroup controlId="closeDate">
                <ControlLabel>Close Date</ControlLabel>
                <DatePicker
                  selected={closeDate}
                  onChange={(date) => setCloseDate(date)}
                  dateFormat="MMMM d, yyyy"
                />
              </FormGroup>

              <FormGroup controlId="groupShowingDate">
                <ControlLabel>Group Showing Date</ControlLabel>
                <DatePicker
                  selected={groupShowingDate}
                  onChange={(date) => setGroupShowingDate(date)}
                  dateFormat="MMMM d, yyyy"
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
                  type="number"
                  onChange={(e) => setBathroom(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="address">
                <ControlLabel>Parking</ControlLabel>
                <FormControl
                  value={parking}
                  type="number"
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

              <FormGroup controlId="propertyNeeds">
                <ControlLabel>Property Needs</ControlLabel>
                <FormControl
                  value={propertyNeeds}
                  type="text"
                  onChange={(e) => setPropertyNeeds(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="whyThisProperty">
                <ControlLabel>Why This Property?</ControlLabel>
                <FormControl
                  value={whyThisProperty}
                  type="text"
                  onChange={(e) => setWhyThisProperty(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="comparable">
                <ControlLabel>Comparable Properties</ControlLabel>
                <FormControl
                  value={comparable}
                  type="text"
                  onChange={(e) => setComparable(e.target.value)}
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
