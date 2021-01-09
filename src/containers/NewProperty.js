import React, { useState, Fragment } from "react";
import {
  Col,
  Row,
  ControlLabel,
  FormControl,
  FormGroup,
  Form,
  Breadcrumb,
} from "react-bootstrap";
import Dropdown from "react-dropdown";
import DatePicker from "react-datepicker";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { API, Storage } from "aws-amplify";
import Loading from "./Loading";

import "./NewProperty.css";
import "react-dropdown/style.css";
import "react-datepicker/dist/react-datepicker.css";
import checkmarkIcon from "../assets/checkmark-icon.png";
import backIcon from "../assets/back-icon-green.png";

export default function PropertyMultiForm(props) {
  // const [form, setForm] = useState({
  //     title: "",
  //     tagline: "",
  //     city: "",
  //     address: "",
  //     propertyType: "",
  //     propertyStatus: "",
  //     offerDate: new Date(),
  //     closeDate: new Date(),
  //     groupShowingDate: new Date(),
  //     bedroom: 1,
  //     bathroom: 1,
  //     parking: 1,
  //     netOperatingIncome: 0,
  //     description: "",
  //     propertyNeeds: "",
  //     whyThisProperty: "",
  //     comparable: "",
  //     longitude: "",
  //     latitude: "",
  //     /* need to test file piece */
  //     file: false,
  //     /* test this piece */
  //     price: "",
  //     nearbyPrice: "",
  //     arvPrice: "",
  // })

  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [geoAddress, setGeoAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [offerDate, setOfferDate] = useState();
  const [closeDate, setCloseDate] = useState();
  const [groupShowingDate, setGroupShowingDate] = useState();
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
  const [yearBuilt, setYearBuilt] = useState("");
  const [lotSize, setLotSize] = useState("");
  const [associationFees, setAssociationFees] = useState("");

  const [step, setStep] = useState(1);
  const stageNames = [
    "Basic Info",
    "Property Details",
    "Comparables",
    "Images",
    "Price",
  ];

  // const updateForm = (e) => {
  //     setForm({
  //         ...form,
  //         [e.target.name]: e.target.value,

  //     })
  // }

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
        yearBuilt,
        lotSize,
        associationFees,
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
    <div className='Index'>
      <div className='Breadcrumbs'>
        <div className='Breadcrumbs-items container'>
          <Breadcrumb>
            <Breadcrumb.Item href='/properties'>Properties</Breadcrumb.Item>
            <Breadcrumb.Item active>New Property</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className='MultiForm'>
        <div className='container'>
          <div className='MultiForm__Wrapper'>
            <div className='progressbar-wrapper'>
              <ul className='progressbar'>
                {stageNames.map((stageName, index) => {
                  index++;
                  let nodeFill = null;
                  if (step === index) {
                    nodeFill = "active";
                  } else if (step > index) {
                    nodeFill = "complete";
                  }
                  return (
                    <li className={nodeFill} key={stageName}>
                      {stageName}
                      <span />
                      <img src={checkmarkIcon} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <Form className='MultiForm__Section'>
              {step === 1 ? (
                <Fragment>
                  <div className='MultiForm__Title'>
                    <h1>Basic Information</h1>
                    <h2>Please add a title and description</h2>
                  </div>
                  <FormGroup controlId='title'>
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                      value={title}
                      type='text'
                      placeholder='Beautiful detached house in downtown London'
                      onChange={(e) => setTitle(e.target.value)}
                      name='title'
                    />
                  </FormGroup>
                  <FormGroup controlId='tagline'>
                    <ControlLabel>Tagline</ControlLabel>
                    <FormControl
                      value={tagline}
                      type='text'
                      placeholder='I.e. $30k under Market Value'
                      onChange={(e) => setTagline(e.target.value)}
                      name='tagline'
                    />
                  </FormGroup>
                  <FormGroup controlId='address'>
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
                        <Fragment>
                          <input
                            className='MultiForm__AutoComplete'
                            {...getInputProps({
                              placeholder: "Type address",
                            })}
                          />
                          <div>
                            {loading ? (
                              <div className='MultiForm__AutoComplete'>
                                ...loading
                              </div>
                            ) : null}

                            {suggestions.map((suggestion, i) => {
                              return (
                                <div
                                  className='MultiForm__AutoComplete-Suggestions'
                                  key={i}
                                  {...getSuggestionItemProps(suggestion, {})}
                                >
                                  {suggestion.description}
                                </div>
                              );
                            })}
                          </div>
                        </Fragment>
                      )}
                    </PlacesAutocomplete>
                  </FormGroup>
                  <div className='MultiForm__Row MultiForm__Row-3'>
                    <FormGroup controlId='yearBuilt'>
                      <ControlLabel>Year Built</ControlLabel>
                      <FormControl
                        value={yearBuilt}
                        type='number'
                        placeholder='0'
                        onChange={(e) => setYearBuilt(e.target.value)}
                        name='yearBuilt'
                      />
                    </FormGroup>
                    <FormGroup controlId='lotSize'>
                      <ControlLabel>Lot Size</ControlLabel>
                      <FormControl
                        value={lotSize}
                        type='number'
                        placeholder='0'
                        onChange={(e) => setLotSize(e.target.value)}
                        name='lotSize'
                      />
                    </FormGroup>
                    <FormGroup controlId='associationFees'>
                      <ControlLabel>Association Fees</ControlLabel>
                      <FormControl
                        value={associationFees}
                        type='number'
                        placeholder='0'
                        onChange={(e) => setAssociationFees(e.target.value)}
                        name='associationFees'
                      />
                    </FormGroup>
                  </div>
                </Fragment>
              ) : null}

              {step === 2 ? (
                <Fragment>
                  <div className='MultiForm__Title'>
                    <h1>Property Detail</h1>
                    <h2>Please add a title and description</h2>
                  </div>
                  <FormGroup controlId='propertyType'>
                    <ControlLabel>Property Type</ControlLabel>
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
                      type='dropdown'
                      onChange={updatePropertyType}
                      placeholder='Select an Option'
                    />
                  </FormGroup>

                  <FormGroup controlId='propertyStatus'>
                    <ControlLabel>Property Status</ControlLabel>
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
                      name='propertyStatus'
                    />
                  </FormGroup>
                  <div className='MultiForm__Row MultiForm__Row-3'>
                    <FormGroup controlId='bedroom'>
                      <ControlLabel>Bedrooms</ControlLabel>
                      <FormControl
                        value={bedroom}
                        type='number'
                        placeholder='0'
                        onChange={(e) => setBedroom(e.target.value)}
                        name='bedroom'
                      />
                    </FormGroup>

                    <FormGroup controlId='bathroom'>
                      <ControlLabel>Bathrooms</ControlLabel>
                      <FormControl
                        value={bathroom}
                        type='number'
                        placeholder='0'
                        onChange={(e) => setBathroom(e.target.value)}
                        name='bathrooms'
                      />
                    </FormGroup>

                    <FormGroup controlId='parking'>
                      <ControlLabel>Parking</ControlLabel>
                      <FormControl
                        value={parking}
                        type='number'
                        placeholder='0'
                        onChange={(e) => setParking(e.target.value)}
                        name='parking'
                      />
                    </FormGroup>
                  </div>

                  <FormGroup controlId='description'>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                      value={description}
                      rows={5}
                      componentClass='textarea'
                      placeholder='Enter the Description'
                      onChange={(e) => setDescription(e.target.value)}
                      name='description'
                    />
                  </FormGroup>
                </Fragment>
              ) : null}

              {step === 3 ? (
                <Fragment>
                  <div className='MultiForm__Title'>
                    <h1>Comparables</h1>
                    <h2>Please add a title and description</h2>
                  </div>
                  <FormGroup controlId='whyThisProperty'>
                    <ControlLabel>Why This Property?</ControlLabel>
                    <FormControl
                      value={whyThisProperty}
                      componentClass='textarea'
                      onChange={(e) => setWhyThisProperty(e.target.value)}
                      name='whyThisProperty'
                      placeholder='Enter Why This Property'
                      rows={4}
                    />
                  </FormGroup>
                  <FormGroup controlId='propertyNeeds'>
                    <ControlLabel>Property Needs</ControlLabel>
                    <FormControl
                      value={propertyNeeds}
                      componentClass='textarea'
                      placeholder='Enter the Property Needs'
                      onChange={(e) => setPropertyNeeds(e.target.value)}
                      name='propertyNeeds'
                      rows={4}
                    />
                  </FormGroup>
                  <FormGroup controlId='comparableProperties'>
                    <ControlLabel>Comparable Properties</ControlLabel>
                    <FormControl
                      value={comparable}
                      componentClass='textarea'
                      placeholder='Enter the Comparables'
                      onChange={(e) => setComparable(e.target.value)}
                      name='comparableProperties'
                      rows={4}
                    />
                  </FormGroup>
                </Fragment>
              ) : null}

              {step === 4 ? (
                <Fragment>
                  <div className='MultiForm__Title'>
                    <h1>Price and Dates</h1>
                    <h2>Please add a title and description</h2>
                  </div>

                  <div className='MultiForm__Row MultiForm__Row-3'>
                    <FormGroup controlId='offerDate'>
                      <ControlLabel>Offer Date</ControlLabel>
                      <DatePicker
                        selected={offerDate}
                        onChange={(date) => setOfferDate(date)}
                        name='offerDate'
                        dateFormat='MMMM d, yyyy'
                        className='form-control'
                      />
                    </FormGroup>
                    <FormGroup controlId='closeDate'>
                      <ControlLabel>Close Date</ControlLabel>
                      <DatePicker
                        className='AutoComplete'
                        selected={closeDate}
                        onChange={(date) => setCloseDate(date)}
                        name='closeDate'
                        dateFormat='MMMM d, yyyy'
                        className='form-control'
                      />
                    </FormGroup>
                    <FormGroup controlId='groupShowingDate'>
                      <ControlLabel>Group Showing Date</ControlLabel>
                      <DatePicker
                        className='AutoComplete'
                        selected={groupShowingDate}
                        onChange={(date) => setGroupShowingDate(date)}
                        name='groupShowingDate'
                        dateFormat='MMMM d, yyyy'
                        className='form-control'
                      />
                    </FormGroup>
                  </div>
                  <div className='MultiForm__Row MultiForm__Row-3'>
                    <FormGroup controlId='price'>
                      <ControlLabel>Price</ControlLabel>
                      <FormControl
                        value={price}
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        name='price'
                        pattern='[0-9]*'
                      />
                    </FormGroup>
                    <FormGroup controlId='nearbyPrice'>
                      <ControlLabel>Nearby Price</ControlLabel>
                      <FormControl
                        value={nearbyPrice}
                        type='number'
                        onChange={(e) => setNearbyPrice(e.target.value)}
                        name='nearbyPrice'
                        pattern='[0-9]*'
                      />
                    </FormGroup>
                    <FormGroup controlId='arvPrice'>
                      <ControlLabel>After Repair Value Price</ControlLabel>
                      <FormControl
                        value={arvPrice}
                        type='number'
                        onChange={(e) => setArvPrice(e.target.value)}
                        name='arvPrice'
                        pattern='[0-9]*'
                      />
                    </FormGroup>
                  </div>
                </Fragment>
              ) : null}
            </Form>
            <div className='MultiForm__btn-container'>
              {step > 1 && (
                <button
                  className='MultiForm__back-btn btn'
                  onClick={() => setStep(step - 1)}
                >
                  <img src={backIcon} />
                  Back
                </button>
              )}
              <button
                className='MultiForm__btn btn'
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
