import "./NewProperty.css";
import "react-dropdown/style.css";
import "react-datepicker/dist/react-datepicker.css";

import { API, Storage } from "aws-amplify";
import { Col, Row, Breadcrumb, ControlLabel, FormControl, FormGroup, } from "react-bootstrap";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Dropdown from "react-dropdown";
import Loading from "./Loading";

export default function OldNewProperty(props) {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [geoAddress, setGeoAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [offerDate, setOfferDate] = useState(new Date());
  const [closeDate, setCloseDate] = useState(new Date());
  const [groupShowingDate, setGroupShowingDate] = useState(new Date());
  const [bedroom, setBedroom] = useState(1);
  const [bathroom, setBathroom] = useState(1);
  const [parking, setParking] = useState(1);
  const [netOperatingIncome, setNetOperatingIncome] = useState(0);
  const [description, setDescription] = useState("");
  const [propertyNeeds, setPropertyNeeds] = useState("");
  const [whyThisProperty, setWhyThisProperty] = useState("");
  const [comparable, setComparable] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(false);
  const [price, setPrice] = useState("");
  const [nearbyPrice, setNearbyPrice] = useState("");
  const [arvPrice, setArvPrice] = useState("");

  function validateForm() {
    return title.length > 5;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const image = file ? await s3Upload(file) : null;
      console.log(image);
      const property = await createProperty({
        title,
        tagline,
        city,
        address,
        propertyType: propertyType.value,
        propertyStatus: propertyStatus.value,
        offerDate,
        closeDate,
        groupShowingDate,
        bedroom,
        bathroom,
        parking,
        netOperatingIncome,
        description,
        propertyNeeds,
        whyThisProperty,
        comparable,
        longitude,
        latitude,
        image,
        price,
        nearbyPrice,
        arvPrice,
      });
      props.history.push(`/properties/${property.propertyId}`);
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

  function updatePropertyStatus(propertyStatus) {
    setPropertyStatus(propertyStatus);
  }

  function updatePropertyType(propertyType) {
    setPropertyType(propertyType);
  }

  async function handleSelect(val) {
    const results = await geocodeByAddress(val);
    const result = results[0];
    const latLng = await getLatLng(result);
    setCity(
      result.address_components.filter((component) =>
        component.types.includes("locality")
      )[0]["long_name"]
    );
    setAddress(result.formatted_address);
    setLongitude(latLng.lng);
    setLatitude(latLng.lat);
    setGeoAddress(result.formatted_address);
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

  return (
    <div className="Index">
      <div className="Breadcrumbs">
        <div className="Breadcrumbs-items container">
            <Breadcrumb>
              <Breadcrumb.Item href="/properties">Properties</Breadcrumb.Item>
              <Breadcrumb.Item active>New Property</Breadcrumb.Item>
            </Breadcrumb>
        </div>
      </div>
        <div className="ViewProperty">
          <div className="container">
          <div className="ViewProperty-Wrapper">
          {!isLoading ? (
            <Row>
              <Col sm={7}>
                <div className="Back-Link">
                  <a href={`/properties`}>
                      Back to List
                  </a>
                </div>
                <div>
                  <h1>New Property</h1>
                  <p>Please Add a title and Description</p>
                  <form onSubmit={handleSubmit}>
                    <FormGroup controlId="title">
                      <ControlLabel>Title</ControlLabel>
                      <FormControl
                        value={title}
                        type="text"
                        placeholder="Beautiful detached house in downtown London"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup controlId="tagline">
                      <ControlLabel>Tagline</ControlLabel>
                      <FormControl
                        value={tagline}
                        type="text"
                        placeholder="I.e. $30k under Market Value"
                        onChange={(e) => setTagline(e.target.value)}
                      />
                    </FormGroup>
                    <Row>
                      <Col xs={6}>
                        <FormGroup controlId="price">
                          <ControlLabel>Price</ControlLabel>
                          <FormControl
                            value={price}
                            type="text"
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={6}>
                        <FormGroup controlId="nearbyPrice">
                          <ControlLabel>Nearby Price</ControlLabel>
                          <FormControl
                            value={nearbyPrice}
                            type="text"
                            onChange={(e) => setNearbyPrice(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                          <FormGroup controlId="arvPrice">
                            <ControlLabel>After Repair Value Price</ControlLabel>
                            <FormControl
                              value={arvPrice}
                              type="text"
                              onChange={(e) => setArvPrice(e.target.value)}
                            />
                          </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup controlId="address">
                      <ControlLabel>Address</ControlLabel>
                        <PlacesAutocomplete
                          value={geoAddress}
                          onChange={setGeoAddress}
                          onSelect={handleSelect}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => (
                            <div>
                              <input className="AutoComplete"
                                {...getInputProps({ placeholder: "Type address" })}
                              />
                              <div>
                                {loading ? <div className="AutoComplete">...loading</div> : null}

                                {suggestions.map((suggestion, i) => {
                                  return (
                                    <div className="AutoComplete-Suggestions"
                                      key={i}
                                      {...getSuggestionItemProps(suggestion, {})}
                                    >
                                      {suggestion.description}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                      </PlacesAutocomplete>
                    </FormGroup>
                    <Row>    
                      <Col xs={6}>
                        <FormGroup controlId="propertyType">
                          <ControlLabel>Property Type</ControlLabel>
                          <br />
                          <br />
                          <Dropdown
                            value={propertyType}
                            options={[
                              {
                                label: "Detached",
                                value: "Detached",
                              },
                              {
                                label: "Semi-Detached",
                                value: "Semi-Detached",
                              },
                              {
                                label: "Townhome",
                                value: "Townhome",
                              },
                              {
                                label: "Condo",
                                value: "Condo",
                              },
                              {
                                label: "Multi-family",
                                value: "Multi-family",
                              },
                            ]}
                            onChange={updatePropertyType}
                          />
                        </FormGroup>
                      </Col>  
                      <Col xs={6}>
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
                      </Col>        
                    </Row> 
                    <Row>
                      <Col xs={4}>
                        <FormGroup controlId="offerDate">
                          <ControlLabel>Offer Date</ControlLabel>
                          <DatePicker className="AutoComplete"
                            selected={offerDate}
                            onChange={(date) => setOfferDate(date)}
                            dateFormat="MMMM d, yyyy"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={4}>
                        <FormGroup controlId="closeDate">
                          <ControlLabel>Close Date</ControlLabel>
                          <DatePicker className="AutoComplete"
                            selected={closeDate}
                            onChange={(date) => setCloseDate(date)}
                            dateFormat="MMMM d, yyyy"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={4}>
                        <FormGroup controlId="groupShowingDate">
                          <ControlLabel>Group Showing Date</ControlLabel>
                          <DatePicker className="AutoComplete"
                            selected={groupShowingDate}
                            onChange={(date) => setGroupShowingDate(date)}
                            dateFormat="MMMM d, yyyy"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                        <FormGroup controlId="bedroom">
                          <ControlLabel>Bedrooms</ControlLabel>
                          <FormControl
                            value={bedroom}
                            type="number"
                            placeholder="0"
                            onChange={(e) => setBedroom(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={4}>
                        <FormGroup controlId="bathroom">
                          <ControlLabel>Bathrooms</ControlLabel>
                          <FormControl
                            value={bathroom}
                            type="number"
                            placeholder="0"
                            onChange={(e) => setBathroom(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={4}>
                        <FormGroup controlId="parking">
                          <ControlLabel>Parking</ControlLabel>
                          <FormControl
                            value={parking}
                            type="number"
                            placeholder="0"
                            onChange={(e) => setParking(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup controlId="netOperatingIncome">
                      <ControlLabel>Net Operating Income</ControlLabel>
                      <FormControl
                        value={netOperatingIncome}
                        type="text"
                        onChange={(e) => setNetOperatingIncome(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup controlId="description">
                      <ControlLabel>Description</ControlLabel>
                      <FormControl
                        value={description}
                        componentClass="textarea"
                        placeholder="Enter the description"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup controlId="propertyNeeds">
                      <ControlLabel>Property Needs</ControlLabel>
                      <FormControl
                        value={propertyNeeds}
                        componentClass="textarea"
                        placeholder="Enter the Property Needs"
                        onChange={(e) => setPropertyNeeds(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup controlId="whyThisProperty">
                      <ControlLabel>Why This Property?</ControlLabel>
                      <FormControl
                        value={whyThisProperty}
                        componentClass="textarea"
                        placeholder="Enter Why This Property"
                        onChange={(e) => setWhyThisProperty(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup controlId="comparable">
                      <ControlLabel>Comparable Properties</ControlLabel>
                      <FormControl
                        value={comparable}
                        componentClass="textarea"
                        placeholder="Enter the Comparables"
                        onChange={(e) => setComparable(e.target.value)}
                      />
                    </FormGroup>

                   

                    <br />
                    <Col xs={4}>
                      <button
                        className="secondary-btn"
                        type="submit"
                        disabled={!validateForm()}
                      >
                        Create Property
                      </button>
                    </Col>
                  </form>
                </div>
              </Col>
              <Col sm={5}>
              <div
                style={{
                  // backgroundImage: `url(https://wholesale-ls-marketing.s3.amazonaws.com/Icons/upload.svg)`,
                  backgroundSize: "cover",
                  height: "344px",
                  width: "515px",
                  borderRadius: "5px",
                  marginBottom: "5px",
                  marginTop: "24px",
                  backgroundColor: "rgba(243,243,243,1.0)",
                  // marginLeft: "-78px",
                }}
                // className="propertyImage"
              >
              </div>
               <FormGroup controlId="image">
                      <ControlLabel>Property Image</ControlLabel>
                      <FormControl onChange={handleFileChange} type="file" />
              </FormGroup>
              </Col>
            </Row>
          ) : (
            <Loading />
          )}
            </div>
          </div>
        </div>
    </div>
  );
}
