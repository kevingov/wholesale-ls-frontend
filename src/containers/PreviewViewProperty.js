import "./ViewProperty.css";

import { Col, Modal, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import { numberWithCommas } from "../helper";
import mapPinIcon from "../assets/map-pin-icon.png";
import Slider from "../components/Slider";
import PropertyMap from "../components/PropertyMap";

export default function PreviewViewProperty({ property }) {
  // const [propertyOwner, setPropertyOwner] = useState(false);
  // const [profile, setProfile] = useState(null);
  const [viewCreateAccountModal, setViewCreateAccountModal] = useState(null);
  // const [infoSent, setInfoSent] = useState(false);
  const [fullSliderActive, setFullSliderActive] = useState(false);
  const [sliderActiveIndex, setSliderActiveIndex] = useState(0);

  // useEffect(() => {
  //   function loadProperty() {
  //     return API.get("properties", `/properties/${props.match.params.id}`);
  //   }

  // function loadProfile(userId) {
  //   return API.get("profiles", `/profiles/${userId}`);
  // }

  // async function onLoad() {
  //   try {
  //     const user = await Auth.currentUserInfo();
  //     let userId = "none";
  //     if (user) userId = user["id"];
  //     const profile = await loadProfile(property.userId);
  //     setProfile(profile);
  //     setPropertyOwner(userId === property.userId);
  //     setProperty(property);
  //     setIsLoading(true);
  //     console.log("here is profile");
  //     console.log(profile);
  //   } catch (e) {
  //     alert(e);
  //   }
  // }

  //   onLoad();
  // }, [props.match.params.id]);

  const toggleFullScreenSlider = () => {
    if (fullSliderActive) {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
    setFullSliderActive(!fullSliderActive);
  };

  return (
    <div className='Index'>
      {fullSliderActive && (
        <div onClick={toggleFullScreenSlider} className='FullScreenSlider'>
          <Slider
            updateActiveIndex={setSliderActiveIndex}
            fullScreenMode={true}
            activeIndex={sliderActiveIndex}
            slides={property.images}
          />
        </div>
      )}
      <div className='ViewProperty'>
        <div className='container'>
          <div className='ViewProperty__Wrapper'>
            <div>
              <div>
                <div className='ViewProperty__Header'>
                  <h2>{property.title}</h2>
                  <div className='ViewProperty__Address'>
                    <img src={mapPinIcon} alt='Map Pin Icon' />
                    <p>{property.address}</p>
                  </div>
                </div>

                <div className='ViewProperty__Row-Highlights'>
                  {property.bedroom && <div>{property.bedroom} Bedrooms</div>}
                  {property.bathroom && (
                    <div>{property.bathroom} Bathrooms</div>
                  )}
                  {property.propertyType && <div>{property.propertyType}</div>}
                </div>
                <Row className='equal'>
                  <Col md={6}>
                    <div className='ViewPropertyCard'>
                      <div className='ViewPropertyCard__Image-Container'>
                        <div className='ViewPropertyCard__Image-Highlight'>
                          ${numberWithCommas(property.price)}
                        </div>
                        <Slider
                          updateActiveIndex={setSliderActiveIndex}
                          toggleFullScreen={toggleFullScreenSlider}
                          activeIndex={sliderActiveIndex}
                          slides={property.images}
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
                                {/* Posted By {profile.firstName} {profile.lastName}
                                {property.lastName} */}
                                Posty By Test User
                              </b>
                              <p className='lightText'>(647) XXX-XXXX</p>
                            </div>
                          </div>
                          <button className='ViewPropertyCard__ContactButton secondary-btn'>
                            Contact
                          </button>
                        </div>
                        <hr className='ViewPropertyCard__Separator' />
                        <div className='CardContainer'>
                          <table className='ViewPropertyCard__PriceBreakdown'>
                            <tbody>
                              <tr>
                                <td>After Repair Value</td>
                                <td>$ {numberWithCommas(property.arvPrice)}</td>
                              </tr>
                              <tr>
                                <td>Asking Price</td>
                                <td>$ {numberWithCommas(property.price)}</td>
                              </tr>
                              {/* <tr>
                                <td>Estimated Cost of Repairs</td>
                                <td>$0</td>
                              </tr> */}
                            </tbody>
                          </table>
                        </div>
                        <hr className='ViewPropertyCard__Separator' />
                        <div className='CardContainer'>
                          <p className='midBold'>Estimated Profit</p>
                          <div className='ViewPropertyCard__EstimatedReturns'>
                            <div className='ViewPropertyCard__PercentageReturns'>
                              {(
                                ((property.arvPrice - property.price) /
                                  property.price) *
                                100
                              ).toFixed(2) + "%"}
                            </div>
                            <p className='midBold'>
                              ${" "}
                              {(
                                property.arvPrice - property.price
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
                        <p className='lightText'>{property.description}</p>
                        <table className='ViewProperty__DetailsTable'>
                          <tbody>
                            <tr>
                              <td>Bedrooms</td>
                              <td>{property.bedroom}</td>
                            </tr>
                            <tr>
                              <td>Bathrooms</td>
                              <td>{property.bathroom}</td>
                            </tr>
                            <tr>
                              <td>Built</td>
                              <td>{property.yearBuilt}</td>
                            </tr>
                            <tr>
                              <td>Lot Size</td>
                              <td>{property.lotSize}</td>
                            </tr>
                            <tr>
                              <td>Parking Type</td>
                              <td>{property.parking}</td>
                            </tr>
                            <tr>
                              <td>Property Type</td>
                              <td>{property.propertyType}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className='ViewProperty__Desc'>
                        <h3>Property Needs</h3>
                        <p>{property.propertyNeeds}</p>
                      </div>
                      <div className='ViewProperty__Desc'>
                        <h3>Why this Property?</h3>
                        <p>{property.whyThisProperty}</p>
                      </div>
                      <div className='ViewProperty__Desc'>
                        <h3>Comparable Properties</h3>
                        <p>{property.comparable}</p>
                      </div>
                    </div>
                    <div className='ViewProperty__MapContainer'>
                      <PropertyMap
                        latitude={property.latitude}
                        longitude={property.longitude}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <Modal
              show={viewCreateAccountModal}
              onHide={() => setViewCreateAccountModal(false)}
              dialogClassName='modal-90w'
            >
              <Modal.Body>
                <div className='modal-card text-center'>
                  <h1>create account first</h1>
                  <p>
                    You'll have to create an account to get more info on this
                    property
                  </p>
                  <a
                    alt='create account btn'
                    className='secondary-btn'
                    href='/signup'
                  >
                    Create an account
                  </a>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
