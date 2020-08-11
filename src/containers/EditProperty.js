import "./EditProperty.css";

import { API, Auth, Storage } from "aws-amplify";
import { Button, ControlLabel, FormControl, FormGroup } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import Dropdown from "react-dropdown";
import LoaderButton from "../components/LoaderButton";
import Loading from "./Loading";
import MdTrash from "react-ionicons/lib/MdTrash";
import config from "../config";

export default function EditProperty(props) {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
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
  const [image, setImage] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [file, setFile] = useState(false);
  const [price, setPrice] = useState("");

  useEffect(() => {
    function loadProperty() {
      return API.get("properties", `/properties/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const user = await Auth.currentUserInfo();
        const userId = user["id"];
        const property = await loadProperty();
        setPropertyId(property.propertyId);
        setPropertyOwner(userId === property.userId);
        setTitle(property.title);
        setTagline(property.tagline);
        setCity(property.city);
        setAddress(property.address);
        setPropertyType(property.propertyType);
        setPropertyStatus(property.propertyStatus);
        setOfferDate(new Date(property.offerDate));
        setCloseDate(new Date(property.closeDate));
        setGroupShowingDate(new Date(property.groupShowingDate));
        setBedroom(property.bedroom);
        setBathroom(property.bathroom);
        setParking(property.parking);
        setNetOperatingIncome(property.netOperatingIncome);
        setCanCrowdFund(property.canCrowdFund);
        setDescription(property.description);
        setPropertyNeeds(property.propertyNeeds);
        setWhyThisProperty(property.whyThisProperty);
        setComparable(property.comparable);
        setImage(property.image);
        setLatitude(property.latitude);
        setLongitude(property.longitude);
        setIsLoading(false);
        setPrice(property.price);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function deleteProperty() {
    return API.del("properties", `/properties/${props.match.params.id}`);
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
    return API.put("properties", `/properties/${props.match.params.id}`, {
      body: property,
    });
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function s3Upload(file) {
    const filename = `${Date.now()}-${file.name}`;

    try {
      const stored = await Storage.put(filename, file, {
        level: "public",
        contentType: file.type,
      });
      return stored.key;
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newImage = file ? await s3Upload(file) : image;
      console.log(newImage);
      await saveProperty({
        title,
        tagline,
        city,
        address,
        propertyType,
        propertyStatus,
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
        image: newImage,
        latitude,
        longitude,
        price,
      });
      props.history.push(`/properties/${propertyId}`);
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function updatePropertyStatus(propertyStatus) {
    setPropertyStatus(propertyStatus);
  }

  function updatePropertyType(propertyType) {
    setPropertyType(propertyType);
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
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

              <FormGroup controlId="price">
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  value={price}
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
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
                      label: "Detached",
                      value: "detached",
                    },
                    {
                      label: "Semi-Detached",
                      value: "Semi-Detached",
                    },
                    {
                      label: "Townhomes",
                      value: "Townhomes",
                    },
                    {
                      label: "Condos",
                      value: "Condos",
                    },
                    {
                      label: "Multi-family",
                      value: "Multi-family",
                    },
                  ]}
                  onChange={updatePropertyType}
                />
              </FormGroup>

              <FormGroup controlId="propertyStatus">
                <ControlLabel>Property Status</ControlLabel>
                <br />
                <br />
                <Dropdown
                  value={propertyStatus}
                  options={[
                    {
                      label: "Active",
                      value: "Active",
                    },
                    {
                      label: "Pending",
                      value: "Pending",
                    },
                    {
                      label: "Assigned",
                      value: "Assigned",
                    },
                  ]}
                  onChange={updatePropertyStatus}
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

              {image && (
                <FormGroup>
                  <ControlLabel>Image</ControlLabel>
                  <FormControl.Static>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://${config.s3.BUCKET}.s3.amazonaws.com/public/${image}`}
                      className="pull-left"
                    >
                      {formatFilename(image)}
                    </a>
                  </FormControl.Static>
                </FormGroup>
              )}
              <FormGroup controlId="file">
                {!image && <ControlLabel>Attachment</ControlLabel>}
                <FormControl onChange={handleFileChange} type="file" />
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
          <h2>Sorry, but it doesn't look like you own this listing.</h2>
          <h2>Please select one that you own to edit.</h2>
          <Button href="/properties" variant="success" className="text-center">
            Back to Properties
          </Button>
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
