import React, { useState, useRef, Fragment } from "react";
import {
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
import { API, Storage, a, sectionFooterSecondaryContent } from "aws-amplify";

import "./NewProperty.css";
import "react-dropdown/style.css";
import "react-datepicker/dist/react-datepicker.css";
import checkmarkIcon from "../assets/checkmark-icon.png";
import backIcon from "../assets/back-icon-green.png";
import imageUploadIcon from "../assets/image-upload-icon.png";
import imageDeleteIcon from "../assets/x-icon.png";
import LoaderButton from "../components/LoaderButton";
import PreviewViewProperty from "./PreviewViewProperty";
import { PROPERTY_STATUSES, PROPERTY_TYPES } from "../helper/Data";

export default function PropertyMultiForm(props) {
  const [fields, setFields] = useState({
    title: "",
    tagline: "",
    city: "",
    province: "",
    address: "",
    geoAddress: "",
    propertyType: "",
    propertyStatus: "",
    offerDate: "",
    closeDate: "",
    groupShowingDate: "",
    bedroom: "",
    bathroom: "",
    parking: "",
    netOperatingIncome: "",
    description: "",
    propertyNeeds: "",
    whyThisProperty: "",
    comparable: "",
    longitude: "",
    latitude: "",
    price: "",
    nearbyPrice: "",
    arvPrice: "",
    yearBuilt: "",
    lotSize: "",
    associationFees: "",
  });

  // const [title, setTitle] = useState("");
  // const [tagline, setTagline] = useState("");
  // const [city, setCity] = useState("");
  // const [province, setProvince] = useState("");
  // const [address, setAddress] = useState("");
  // const [geoAddress, setGeoAddress] = useState("");
  // const [propertyType, setPropertyType] = useState("");
  // const [propertyStatus, setPropertyStatus] = useState("");
  // const [offerDate, setOfferDate] = useState();
  // const [closeDate, setCloseDate] = useState();
  // const [groupShowingDate, setGroupShowingDate] = useState();
  // const [bedroom, setBedroom] = useState();
  // const [bathroom, setBathroom] = useState();
  // const [parking, setParking] = useState();
  // const [netOperatingIncome, setNetOperatingIncome] = useState(0);
  // const [description, setDescription] = useState("");
  // const [propertyNeeds, setPropertyNeeds] = useState("");
  // const [whyThisProperty, setWhyThisProperty] = useState("");
  // const [comparable, setComparable] = useState("");
  // const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [price, setPrice] = useState("");
  // const [nearbyPrice, setNearbyPrice] = useState("");
  // const [arvPrice, setArvPrice] = useState("");
  // const [yearBuilt, setYearBuilt] = useState("");
  // const [lotSize, setLotSize] = useState("");
  // const [associationFees, setAssociationFees] = useState("");

  const uploadFileRef = useRef();
  const [filesUploaded, setFilesUploaded] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const stageNames = [
    "Basic Info",
    "Property Details",
    "Comparables",
    "Images",
    "Price",
  ];

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const images = filesUploaded ? await s3Upload(filesUploaded) : null;
      const property = await createProperty({
        ...fields,
        image: images,
      });
      // const property = await createProperty({
      //   title,
      //   tagline,
      //   city,
      //   province,
      //   address,
      //   propertyType: propertyType.value,
      //   propertyStatus: propertyStatus.value,
      //   offerDate,
      //   closeDate,
      //   groupShowingDate,
      //   bedroom,
      //   bathroom,
      //   parking,
      //   netOperatingIncome,
      //   description,
      //   propertyNeeds,
      //   whyThisProperty,
      //   comparable,
      //   longitude,
      //   latitude,
      //   image,
      //   price,
      //   nearbyPrice,
      //   arvPrice,
      //   yearBuilt,
      //   lotSize,
      //   associationFees,f
      // });

      props.history.push(`/properties/${property.propertyId}`);
      setIsLoading(false);
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

  async function handleSelectAddress(val) {
    const results = await geocodeByAddress(val);
    const result = results[0];
    const latLng = await getLatLng(result);

    const province = result.address_components.filter((component) =>
      component.types.includes("administrative_area_level_1")
    )[0]["long_name"];
    const city = result.address_components.filter((component) =>
      component.types.includes("locality")
    )[0]["long_name"];

    setFields({
      ...fields,
      province,
      city,
      address: result.formatted_address,
      geoAddress: result.formatted_address,
      longitude: latLng.lng,
      latitude: latLng.lat,
    });
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFilesUploaded((prevImages) => prevImages.concat(fileArray));
    }
  };

  const imageURLs = filesUploaded.map((file) => URL.createObjectURL(file));

  const deleteImage = (deleteAtIndex) => {
    console.log(deleteAtIndex);
    setFilesUploaded((prevFiles) =>
      prevFiles.filter((file, index) => index !== deleteAtIndex)
    );
  };

  const renderPhotos = () => {
    return imageURLs.map((image, index) => (
      <div key={("Property photo - ", index)} className='MultiForm__ImgWrapper'>
        <div
          className='MultiForm__ImgDeleteBtn'
          onClick={() => deleteImage(index)}
        >
          <img style={{ width: "50%", height: "50%" }} src={imageDeleteIcon} />
        </div>
        <img src={image} alt={image} />
      </div>
    ));
  };

  async function s3Upload(files) {
    return Promise.all(
      files.map(async (file) => {
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
      })
    );
  }

  function validateForm() {
    return true;
    // return (
    //   title.length > 0 &&
    //   tagline.length > 0 &&
    //   address.length > 0 &&
    //   yearBuilt > 0 &&
    //   lotSize > 0 &&
    //   associationFees > 0 &&
    //   propertyType.value.length > 0 &&
    //   propertyStatus.value.length > 0 &&
    //   bedroom > 0 &&
    //   bathroom > 0 &&
    //   description.length > 0 &&
    //   whyThisProperty.length > 0 &&
    //   propertyNeeds.length > 0 &&
    //   comparable.length > 0 &&
    //   offerDate > 0 &&
    //   closeDate > 0 &&
    //   groupShowingDate > 0 &&
    //   price > 0 &&
    //   nearbyPrice > 0 &&
    //   arvPrice > 0 &&
    //   filesUploaded.length > 0
    // );
  }

  const handleFieldChange = (event) => {
    const value = event.target.value;
    setFields({
      ...fields,
      [event.target.name]: value,
    });
  };

  const handleOtherFieldChange = (fieldName, event) => {
    const value = event.hasOwnProperty("value") ? event.value : event;
    console.log(value);
    setFields({
      ...fields,
      [fieldName]: value,
    });
  };

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
                      <img alt='checkmark icon' src={checkmarkIcon} />
                    </li>
                  );
                })}
              </ul>
            </div>
            {step >= 1 && step <= 5 && (
              <Form className='MultiForm__Section' onSubmit={handleSubmit}>
                {step === 1 ? (
                  <Fragment>
                    <div className='MultiForm__Title'>
                      <h1>Basic Information</h1>
                      <h2>Please add a title and description</h2>
                    </div>
                    <FormGroup
                      controlId='title'
                      className='form-group required'
                    >
                      <ControlLabel>Title</ControlLabel>
                      <FormControl
                        value={fields.title}
                        type='text'
                        placeholder='Beautiful detached house in downtown London'
                        onChange={handleFieldChange}
                        name='title'
                      />
                    </FormGroup>
                    <FormGroup
                      controlId='tagline'
                      className='form-group required'
                    >
                      <ControlLabel>Tagline</ControlLabel>
                      <FormControl
                        value={fields.tagline}
                        type='text'
                        placeholder='I.e. $30k under Market Value'
                        onChange={handleFieldChange}
                        name='tagline'
                      />
                    </FormGroup>
                    <FormGroup
                      controlId='address'
                      className='form-group required'
                    >
                      <ControlLabel>Address</ControlLabel>
                      <PlacesAutocomplete
                        value={fields.geoAddress}
                        onChange={(geoAddress) =>
                          handleOtherFieldChange("geoAddress", geoAddress)
                        }
                        onSelect={handleSelectAddress}
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
                                    key={suggestion}
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
                      <FormGroup
                        controlId='yearBuilt'
                        className='form-group required'
                      >
                        <ControlLabel>Year Built</ControlLabel>
                        <FormControl
                          value={fields.yearBuilt}
                          type='number'
                          placeholder='0'
                          onChange={handleFieldChange}
                          name='yearBuilt'
                        />
                      </FormGroup>
                      <FormGroup
                        controlId='lotSize'
                        className='form-group required'
                      >
                        <ControlLabel>Lot Size</ControlLabel>
                        <FormControl
                          value={fields.lotSize}
                          type='number'
                          placeholder='0'
                          onChange={handleFieldChange}
                          name='lotSize'
                        />
                      </FormGroup>
                      <FormGroup
                        controlId='associationFees'
                        className='form-group required'
                      >
                        <ControlLabel>Association Fees</ControlLabel>
                        <FormControl
                          value={fields.associationFees}
                          type='number'
                          placeholder='0'
                          onChange={handleFieldChange}
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
                    <FormGroup
                      controlId='propertyType'
                      className='form-group required'
                    >
                      <ControlLabel>Property Type</ControlLabel>
                      <Dropdown
                        value={fields.propertyType}
                        options={PROPERTY_TYPES}
                        type='dropdown'
                        onChange={(value) =>
                          handleOtherFieldChange("propertyType", value)
                        }
                        placeholder='Select an Option'
                        name='propertyType'
                      />
                    </FormGroup>
                    <FormGroup
                      controlId='propertyStatus'
                      className='form-group required'
                    >
                      <ControlLabel>Property Status</ControlLabel>
                      <Dropdown
                        value={fields.propertyStatus}
                        options={PROPERTY_STATUSES}
                        onChange={(value) =>
                          handleOtherFieldChange("propertyStatus", value)
                        }
                        name='propertyStatus'
                      />
                    </FormGroup>
                    <div className='MultiForm__Row MultiForm__Row-3'>
                      <FormGroup
                        controlId='bedroom'
                        className='form-group required'
                      >
                        <ControlLabel>Bedrooms</ControlLabel>
                        <FormControl
                          value={fields.bedroom}
                          type='number'
                          placeholder='0'
                          onChange={handleFieldChange}
                          name='bedroom'
                        />
                      </FormGroup>
                      <FormGroup
                        controlId='bathroom'
                        className='form-group required'
                      >
                        <ControlLabel>Bathrooms</ControlLabel>
                        <FormControl
                          value={fields.bathroom}
                          type='number'
                          placeholder='0'
                          onChange={handleFieldChange}
                          name='bathroom'
                        />
                      </FormGroup>
                      <FormGroup
                        controlId='parking'
                        className='form-group required'
                      >
                        <ControlLabel>Parking</ControlLabel>
                        <FormControl
                          value={fields.parking}
                          type='number'
                          placeholder='0'
                          onChange={handleFieldChange}
                          name='parking'
                        />
                      </FormGroup>
                    </div>
                    <FormGroup
                      controlId='description'
                      className='form-group required'
                    >
                      <ControlLabel>Description</ControlLabel>
                      <FormControl
                        value={fields.description}
                        rows={5}
                        componentClass='textarea'
                        placeholder='Enter the Description'
                        onChange={handleFieldChange}
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
                        value={fields.whyThisProperty}
                        componentClass='textarea'
                        onChange={handleFieldChange}
                        name='whyThisProperty'
                        placeholder='Enter Why This Property'
                        rows={4}
                      />
                    </FormGroup>
                    <FormGroup controlId='propertyNeeds'>
                      <ControlLabel>Property Needs</ControlLabel>
                      <FormControl
                        value={fields.propertyNeeds}
                        componentClass='textarea'
                        placeholder='Enter the Property Needs'
                        onChange={handleFieldChange}
                        name='propertyNeeds'
                        rows={4}
                      />
                    </FormGroup>
                    <FormGroup controlId='comparableProperties'>
                      <ControlLabel>Comparable Properties</ControlLabel>
                      <FormControl
                        value={fields.comparable}
                        componentClass='textarea'
                        placeholder='Enter the Comparables'
                        onChange={handleFieldChange}
                        name='comparable'
                        rows={4}
                      />
                    </FormGroup>
                  </Fragment>
                ) : null}

                {step === 4 ? (
                  <Fragment>
                    <div className='MultiForm__Title'>
                      <h1>Property Images</h1>
                      <h2>
                        Upload interior and exterior images of the property
                      </h2>
                    </div>
                    <div className='MultiForm__Upload-container'>
                      {filesUploaded.length === 0 && (
                        <label className='form-group required'>
                          Please ensure you upload at least one image of the
                          property
                        </label>
                      )}
                      {filesUploaded ? (
                        renderPhotos()
                      ) : (
                        <img
                          alt='file upload icon'
                          className='MultiForm__UploadIcon'
                          src={imageUploadIcon}
                        />
                      )}
                      <input
                        onChange={handleFileChange}
                        type='file'
                        multiple={true}
                        style={{ display: "none" }}
                        ref={uploadFileRef}
                      />
                      <div
                        onClick={() => uploadFileRef.current.click()}
                        className='MultiForm__UploadBtn btn'
                      >
                        UPLOAD
                      </div>
                      <label>
                        {filesUploaded.length + " image(s) uploaded"}
                      </label>
                    </div>
                  </Fragment>
                ) : null}

                {step === 5 ? (
                  <Fragment>
                    <div className='MultiForm__Title'>
                      <h1>Price and Dates</h1>
                      <h2>Please add a title and description</h2>
                    </div>
                    <div className='MultiForm__Row MultiForm__Row-3'>
                      <FormGroup
                        controlId='offerDate'
                        className='form-group required'
                      >
                        <ControlLabel>Offer Date</ControlLabel>
                        <DatePicker
                          selected={fields.offerDate}
                          onChange={(date) =>
                            handleOtherFieldChange("offerDate", date)
                          }
                          name='offerDate'
                          dateFormat='MMMM d, yyyy'
                          className='form-control'
                        />
                      </FormGroup>
                      <FormGroup controlId='closeDate' className='form-group'>
                        <ControlLabel>Close Date</ControlLabel>
                        <DatePicker
                          selected={fields.closeDate}
                          onChange={(date) =>
                            handleOtherFieldChange("closeDate", date)
                          }
                          name='closeDate'
                          dateFormat='MMMM d, yyyy'
                          className='form-control'
                        />
                      </FormGroup>
                      <FormGroup controlId='groupShowingDate'>
                        <ControlLabel>Group Showing Date</ControlLabel>
                        <DatePicker
                          className='form-control'
                          selected={fields.groupShowingDate}
                          onChange={(date) =>
                            handleOtherFieldChange("groupShowingDate", date)
                          }
                          name='groupShowingDate'
                          dateFormat='MMMM d, yyyy'
                        />
                      </FormGroup>
                    </div>
                    <div className='MultiForm__Row MultiForm__Row-3'>
                      <FormGroup
                        controlId='price'
                        className='form-group required'
                      >
                        <ControlLabel>Price</ControlLabel>
                        <FormControl
                          value={fields.price}
                          type='number'
                          onChange={handleFieldChange}
                          name='price'
                          pattern='[0-9]*'
                        />
                      </FormGroup>
                      <FormGroup controlId='nearbyPrice'>
                        <ControlLabel>Nearby Price</ControlLabel>
                        <FormControl
                          value={fields.nearbyPrice}
                          type='number'
                          onChange={handleFieldChange}
                          name='nearbyPrice'
                          pattern='[0-9]*'
                        />
                      </FormGroup>
                      <FormGroup
                        controlId='arvPrice'
                        className='form-group required'
                      >
                        <ControlLabel>After Repair Value Price</ControlLabel>
                        <FormControl
                          value={fields.arvPrice}
                          type='number'
                          onChange={handleFieldChange}
                          name='arvPrice'
                          pattern='[0-9]*'
                        />
                      </FormGroup>
                    </div>
                  </Fragment>
                ) : null}
              </Form>
            )}
            {step === 6 ? (
              <Fragment>
                <div className='MultiForm__Title'>
                  <h1>Previewing New Property Post</h1>
                  <h2>
                    Please review the property details and click Submit to
                    confirm the post
                  </h2>
                </div>
                <PreviewViewProperty
                  property={{
                    ...fields,
                    images: imageURLs,
                  }}
                  // property={{
                  //   title,
                  //   tagline,
                  //   city,
                  //   province,
                  //   address,
                  //   propertyType: propertyType.value,
                  //   propertyStatus: propertyStatus.value,
                  //   offerDate,
                  //   closeDate,
                  //   groupShowingDate,
                  //   bedroom,
                  //   bathroom,
                  //   parking,
                  //   netOperatingIncome,
                  //   description,
                  //   propertyNeeds,
                  //   whyThisProperty,
                  //   comparable,
                  //   longitude,
                  //   latitude,
                  //   images: imageURLs,
                  //   price,
                  //   nearbyPrice,
                  //   arvPrice,
                  //   yearBuilt,
                  //   lotSize,
                  //   associationFees,
                  // }}
                />
              </Fragment>
            ) : null}
            <div className='MultiForm__btn-container'>
              {step > 1 && (
                <button
                  className='MultiForm__back-btn btn'
                  onClick={() => setStep(step - 1)}
                >
                  <img alt='back button icon' src={backIcon} />
                  Back
                </button>
              )}
              {step < 5 && (
                <button
                  className='MultiForm__btn btn'
                  onClick={() => setStep(step + 1)}
                >
                  Next
                </button>
              )}
              {step < 6 && step > 4 && (
                <LoaderButton
                  className='MultiForm__btn btn'
                  type='submit'
                  bsSize='small'
                  isLoading={isLoading}
                  disabled={!validateForm()}
                  onClick={() => setStep(step + 1)}
                >
                  Preview
                </LoaderButton>
              )}

              {step > 5 && (
                <LoaderButton
                  className='MultiForm__btn btn'
                  type='submit'
                  bsSize='small'
                  isLoading={isLoading}
                  disabled={!validateForm()}
                  onClick={handleSubmit}
                >
                  Submit
                </LoaderButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
