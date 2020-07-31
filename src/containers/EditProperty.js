import "./EditProperty.css";

import { API, Auth } from "aws-amplify";
import { ControlLabel, FormControl, FormGroup, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import LoaderButton from "../components/LoaderButton";
import Loading from "./Loading";
import MdTrash from "react-ionicons/lib/MdTrash";

export default function EditProperty(props) {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [offerDate, setOfferDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [groupShowingDate, setGroupShowingDate] = useState("");
  const [bedroom, setBedroom] = useState(0);
  const [bathroom, setBathroom] = useState("");
  const [parking, setParking] = useState("");
  const [netOperatingIncome, setNetOperatingIncome] = useState(0);
  const [canCrowdFund, setCanCrowdFund] = useState(true);
  const [description, setDescription] = useState("");
  const [propertyNeeds, setPropertyNeeds] = useState("");
  const [whyThisProperty, setWhyThisProperty] = useState("");
  const [comparable, setComparable] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [propertyOwner, setPropertyOwner] = useState(true);

  useEffect(() => {
    function loadProperty() {
      return API.get("properties", `/properties/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const user = await Auth.currentUserInfo();
        const userId = user["id"];
        const property = await loadProperty();
        setPropertyOwner(userId === property.userId);
        setPropertyId(property.propertyId);
        setTitle(property.title);
        setTagline(property.tagline);
        setCity(property.city);
        setAddress(property.address);
        setPropertyType(property.propertyType);
        setPropertyStatus(property.propertyStatus);
        setOfferDate(property.offerDate);
        setCloseDate(property.closeDate);
        setGroupShowingDate(property.groupShowingDate);
        setBedroom(property.bedroom);
        setBathroom(property.bathroom);
        setParking(property.parking);
        setNetOperatingIncome(property.netOperatingIncome);
        setCanCrowdFund(property.canCrowdFund);
        setDescription(property.description);
        setPropertyNeeds(property.propertyNeeds);
        setWhyThisProperty(property.whyThisProperty);
        setComparable(property.comparable);
        setIsLoading(false);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function deleteProperty() {
    return API.del("properties", `/properties/${propertyId}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) {
      return;
    }

    setIsLoading(true);

    try {
      await deleteProperty();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function validateForm() {
    return title.length > 0;
  }

  function saveProperty(property) {
    return API.put("properties", `/properties/${propertyId}`, {
      body: property,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await saveProperty({ title });
      setIsLoading(false);
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  return (
    <div className="EditProperty container">
      {propertyOwner ? (
        <div>
          <p className="text-center">
            <span onClick={handleDelete} className="other-btn">
              <MdTrash fontSize="14px" />
              Delete Property
            </span>
          </p>

          {!isLoading ? (
            <form onSubmit={handleSubmit} className="form-wrapper">
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

              <FormGroup controlId="propertyStatus">
                <ControlLabel>Property Status</ControlLabel>
                <FormControl
                  value={propertyStatus}
                  type="text"
                  onChange={(e) => setPropertyStatus(e.target.value)}
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
                  componentClass="textarea"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="propertyNeeds">
                <ControlLabel>Property Needs</ControlLabel>
                <FormControl
                  value={propertyNeeds}
                  componentClass="textarea"
                  onChange={(e) => setPropertyNeeds(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="whyThisProperty">
                <ControlLabel>Why This Property?</ControlLabel>
                <FormControl
                  value={whyThisProperty}
                  componentClass="textarea"
                  onChange={(e) => setWhyThisProperty(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="comparable">
                <ControlLabel>Comparable Properties</ControlLabel>
                <FormControl
                  value={comparable}
                  componentClass="textarea"
                  onChange={(e) => setComparable(e.target.value)}
                />
              </FormGroup>

              <p className="text-right">
                <LoaderButton
                  type="submit"
                  className="other-btn"
                  isLoading={isLoading}
                  disabled={!validateForm()}
                >
                  Update Property
                </LoaderButton>
              </p>
            </form>
          ) : (
            <Loading />
          )}
        </div>
      ) : (
        <div className="text-center">
          <br />
          <br />
          <br />
          <br />
          <h2>
            Sorry, but it doesn't look like you own this listing. 
          </h2>
          <h2>
            Please select one that you own to edit. 
          </h2>
          <Button href="/properties" variant="success" className="text-center">Back to Properties</Button>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      )}
    </div>
  );
}
