import React, { useState, useRef, Fragment } from "react";
import {
  ControlLabel,
  FormControl,
  FormControlFeedback,
  FormLabel,
  FormGroup,
  Form,
  Breadcrumb,
  Col,
  Row,
  Modal
} from "react-bootstrap";
import Dropdown from "react-dropdown";
import DatePicker from "react-datepicker";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { API, Storage, a, sectionFooterSecondaryContent } from "aws-amplify";
import Loading from "./Loading";
import "./NewProperty.css";
import "react-dropdown/style.css";
import "react-datepicker/dist/react-datepicker.css";
import checkmarkIcon from "../assets/checkmark-icon.png";
import backIcon from "../assets/back-icon-green.png";
import imageUploadIcon from "../assets/image-upload-icon.png";
import PropertiesMap from "../components/PropertiesMap";
import mapPinIcon from "../assets/map-pin-icon.png";
import Slider from "../components/Slider";
import { numberWithCommas } from "../helper";
import config from "../config";
import LoaderButton from "../components/LoaderButton";

const images = [
  "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
  "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
  "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
  "https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80",
];

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
  const [files, setFiles] = useState(false);
  const [price, setPrice] = useState("");
  const [nearbyPrice, setNearbyPrice] = useState("");
  const [arvPrice, setArvPrice] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [lotSize, setLotSize] = useState("");
  const [associationFees, setAssociationFees] = useState("");

  const [profile, setProfile] = useState(null);
  const [sliderActiveIndex, setSliderActiveIndex] = useState(0);
  const [viewCreateAccountModal, setViewCreateAccountModal] = useState(null);
  const [infoSent, setInfoSent] = useState(false);
  const [fullSliderActive, setFullSliderActive] = useState(false);

  const uploadFileRef = useRef();
  const [step, setStep] = useState(1);
  const stageNames = [
    "Basic Info",
    "Property Details",
    "Comparables",
    "Images",
    "Price",
  ];
  const [selectedImages, setSelectedImages] = useState([]);




  async function handleSubmit(event) {
    
    event.preventDefault();

    setIsLoading(true);

    try {
      const image = files ? await s3Upload(files) : null;
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
      setIsLoading(false);
      props.history.push(`/properties/${property.propertyId}`);
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  };

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
    console.log(propertyType);
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

  // function handleFileChange(event) {
  //   setFiles(event.target.files);
  // }

  const handleChange = (e) => {
    if(e.target.files){
      const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
      
      setSelectedImages((prevImages)=>prevImages.concat(fileArray))
      Array.from(e.target.files).map(
        (file)=>URL.revokeObjectURL(file)
      )
    };
    setFiles(e.target.files);
  }

  const renderPhotos = (source) => {
    return source.map((photo)=>{
      return <img src={photo} key={photo} />
    })
  }

  async function s3Upload(files) {
    return Promise.all(
      Array.from(files).map(async (file) => {
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

  const toggleFullScreenSlider = (sliderIndex) => {
    if (fullSliderActive) {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
    setFullSliderActive(!fullSliderActive);
  };

  function validateForm() {
    return (
      title.length > 0 &&
      tagline.length > 0 &&
      address.length > 0 &&
      yearBuilt > 0 &&
      lotSize > 0 &&
      associationFees > 0 &&
      propertyType.value.length > 0 &&
      propertyStatus.value.length > 0 &&
      bedroom > 0 && 
      bathroom > 0 && 
      description.length > 0 && 
      whyThisProperty.length > 0 &&
      propertyNeeds.length > 0 &&
      comparable.length > 0 && 
      offerDate > 0 &&
      closeDate > 0 &&
      groupShowingDate > 0 &&
      price > 0 &&
      nearbyPrice > 0 && 
      arvPrice > 0
    );
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
                      <img alt='checkmark icon' src={checkmarkIcon} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <Form className='MultiForm__Section' onSubmit={handleSubmit}>
              {step === 1 ? (
                <Fragment>
                  <div className='MultiForm__Title'>
                    <h1>Basic Information</h1>
                    <h2>Please add a title and description</h2>
                  </div>
                  <FormGroup controlId='title'>
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                      required
                      value={title}
                      type='text'
                      placeholder='Beautiful detached house in downtown London'
                      onChange={(e) => setTitle(e.target.value)}
                      name='title'
                    />
                  {/* <FormControlFeedback>Looks Good!</FormControlFeedback> */}
                  </FormGroup>
                  <FormGroup controlId='tagline'>
                    <ControlLabel>Tagline</ControlLabel>
                    <FormControl
                      required
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
                    <h1>Property Images</h1>
                    <h2>
                      Please upload interior and exterior images of the property
                    </h2>
                  </div>
                  <div className='MultiForm__Upload-container'>
                    {selectedImages ? renderPhotos(selectedImages) : (
                    <img
                      alt='file upload icon'
                      className='MultiForm__UploadIcon'
                      src={imageUploadIcon}
                    />
                    )}
                    <input
                      onChange={handleChange}
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
                      {(uploadFileRef.current
                        ? uploadFileRef.current.files.length
                        : "No") + " image(s) uploaded"}
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
                        className='form-control'
                        selected={groupShowingDate}
                        onChange={(date) => setGroupShowingDate(date)}
                        name='groupShowingDate'
                        dateFormat='MMMM d, yyyy'
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

              {step === 6 ? (
                <Fragment>
                  <div className='ViewProperty__Wrapper'>
                    <div className='ViewProperty__Header'>
                      <h2>{title}</h2>
                      <div className='ViewProperty__Address'>
                        <img src={mapPinIcon} alt='Map Pin Icon' />
                        <p>{address}</p>
                      </div>
                    </div>

                    <div className='ViewProperty__Row-Highlights'>
                      {bedroom && <div>{bedroom} Bedrooms</div>}
                      {bathroom && (
                        <div>{bathroom} Bathrooms</div>
                      )}
                      {propertyType.value && <div>{propertyType.value}</div>}
                    </div>
                    <Row className='equal'>
                      <Col md={6}>
                            <div className='ViewPropertyCard'>
                              <div className='ViewPropertyCard__Image-Container'>
                                <div className='ViewPropertyCard__Image-Highlight'>
                                  ${numberWithCommas(price)}
                                </div>
                                <Slider
                                  updateActiveIndex={setSliderActiveIndex}
                                  toggleFullScreen={toggleFullScreenSlider}
                                  activeIndex={sliderActiveIndex}
                                  slides={images}
                                />
                              </div>

                              <div className='ViewPropertyCard__Details'>
                                <div className='CardContainer'>
                                  <div className='ViewPropertyCard__ContactProfile'>
                                    {/* <img
                                      className='ViewPropertyCard__ContactProfilePic'
                                       alt={`${profile.firstName} ${profile.lastName} avatar`}
                                       src={`https://${config.s3.BUCKET}.s3.amazonaws.com/public/${profile.image}`}
                                    /> */}
                                    <div className='ViewPropertyCard__ContactInfo'>
                                      <b className='ViewPropertyCard__PostedBy'>
                                        Posted By
                                        {/* {profile.firstName} {profile.lastName}
                                        {lastName} */}
                                      </b>
                                      <p className='lightText'>(647) XXX-XXXX</p>
                                    </div>
                                  </div>
                                  {infoSent ? (
                                    <p>info is sent</p>
                                  ) : (
                                    <div>
                                      <button
                                        className='ViewPropertyCard__ContactButton secondary-btn'
                                      >
                                        Contact
                                      </button>
                                      </div>
                                    
                                  )}
                                </div>
                                <hr className='ViewPropertyCard__Separator' />
                                <div className='CardContainer'>
                                  <table className='ViewPropertyCard__PriceBreakdown'>
                                    <tbody>
                                      <tr>
                                        <td>After Repair Value</td>
                                        <td>$ {numberWithCommas(arvPrice)}</td>
                                      </tr>
                                      <tr>
                                        <td>Asking Price</td>
                                        <td>$ {numberWithCommas(price)}</td>
                                      </tr>
                                      <tr>
                                        <td>Estimated Cost of Repairs</td>
                                        <td>$0</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <hr className='ViewPropertyCard__Separator' />
                                <div className='CardContainer'>
                                  <p className='midBold'>Estimated Profit</p>
                                  <div className='ViewPropertyCard__EstimatedReturns'>
                                    <div className='ViewPropertyCard__PercentageReturns'>
                                      {(
                                        ((arvPrice - price) /
                                          price) *
                                        100
                                      ).toFixed(2) + "%"}
                                    </div>
                                    <p className='midBold'>
                                      ${" "}
                                      {(
                                        arvPrice - price
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </Col>
                        
                        <Col md={6}>
                        <div className='ViewProperty__Details'>
                              <div className='ViewProperty__Desc'>
                                <h3>Property Details</h3>
                                <p className='lightText'>{description}</p>
                                <table className='ViewProperty__DetailsTable'>
                                  <tbody>
                                    <tr>
                                      <td>Bedrooms</td>
                                      <td>{bedroom}</td>
                                    </tr>
                                    <tr>
                                      <td>Bathrooms</td>
                                      <td>{bathroom}</td>
                                    </tr>
                                    <tr>
                                      <td>Built</td>
                                      <td>2010</td>
                                    </tr>
                                    <tr>
                                      <td>Lot Size</td>
                                      <td>33.6 x 130 FT; Irregular - Irregular</td>
                                    </tr>
                                    <tr>
                                      <td>Parking Type</td>
                                      <td>{parking}</td>
                                    </tr>
                                    <tr>
                                      <td>Property Type</td>
                                      <td>{propertyType.value}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className='ViewProperty__Desc'>
                                <h3>Property Needs</h3>
                                <p>{propertyNeeds}</p>
                              </div>
                              <div className='ViewProperty__Desc'>
                                <h3>Why this Property?</h3>
                                <p>{whyThisProperty}</p>
                              </div>
                              <div className='ViewProperty__Desc'>
                                <h3>Comparable Properties</h3>
                                <p>{comparable}</p>
                              </div>
                            </div>
                            <div className='ViewProperty__MapContainer'>
                              <PropertiesMap />
                            </div>
                        </Col>
                        
                    </Row>


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
