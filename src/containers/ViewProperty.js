import "./ViewProperty.css";

import { API, Auth } from "aws-amplify";
import { Col, Modal, Row, Breadcrumb } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import Loading from "./Loading";
import config from "../config";
import { numberWithCommas } from "../helper";
import backArrowIcon from "../assets/back-icon.png";
import mapPinIcon from "../assets/map-pin-icon.png";

export default function ViewProperty(props) {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [propertyOwner, setPropertyOwner] = useState(false);
  const [profile, setProfile] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [viewCreateAccountModal, setViewCreateAccountModal] = useState(null);
  const [infoSent, setInfoSent] = useState(false);

  useEffect(() => {
    function loadProperty() {
      return API.get("properties", `/properties/${props.match.params.id}`);
    }

    function loadProfile(userId) {
      return API.get("profiles", `/profiles/${userId}`);
    }

    async function onLoad() {
      try {
        const user = await Auth.currentUserInfo();
        let userId = "none";
        if (user) userId = user["id"];
        if (user) setUserEmail(user.attributes.email);
        const property = await loadProperty();
        console.log(property);
        const profile = await loadProfile(property.userId);
        setProfile(profile);
        setPropertyOwner(userId === property.userId);
        setProperty(property);
        setIsLoading(true);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  async function sendPropertyEmail() {
    await sendEmail({
      buyerEmail: userEmail,
      wholesalerEmail: profile.email,
      propertyTitle: property.title,
      buyerFirstName: "test",
      propertyInfo: property.tagline,
      wholesalerFirstName: profile.firstName,
    });
    setInfoSent(true);
  }

  function sendEmail(info) {
    console.log(info);
    return API.post("properties", "/propertyemail", {
      body: info,
    });
  }

  return (
    <div className='Index'>
      <div className='Breadcrumbs'>
        <div className='Breadcrumbs-items container'>
          <Breadcrumb>
            <Breadcrumb.Item href='/properties'>Properties</Breadcrumb.Item>
            <Breadcrumb.Item active>View Property</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className='ViewProperty'>
        <div className='container'>
          <div className='ViewProperty__Wrapper'>
            {isLoading ? (
              <div>
                {propertyOwner ? (
                  <div>
                    <a
                      href={`/properties/${property.propertyId}/edit`}
                      className='other-btn'
                    >
                      Edit Property
                    </a>
                  </div>
                ) : null}

                <div className='backLink'>
                  <img src={backArrowIcon} alt='Back Arrow Icon' />
                  <a className='navLink' href={`/properties`}>
                    Back to List
                  </a>
                </div>

                <div className='ViewProperty__Header'>
                  <h2>{property.title}</h2>
                  <div className='ViewProperty__Address'>
                    <img src={mapPinIcon} alt='Map Pin Icon' />
                    {/* <p>{property.address}</p> */}
                    <p>1025 Sesame Street, Aurora ON</p>
                  </div>
                </div>

                <div className='ViewProperty__Row-Highlights'>
                  {property.bedroom && <div>{property.bedroom} Bedrooms</div>}
                  {property.bathroom && (
                    <div>{property.bathroom} Bathrooms</div>
                  )}
                  {property.propertType && <div>{property.propertyType}</div>}
                </div>
                <Row className='equal'>
                  <Col md={6}>
                    <div className='ViewPropertyCard'>
                      <div className='ViewPropertyCard__Image-Container'>
                        <div className='ViewPropertyCard__Image-Highlight'>
                          ${numberWithCommas(property.price)}
                        </div>
                        <img
                          alt={`${property.address} - Focus Property`}
                          src={`https://${config.s3.BUCKET}.s3.amazonaws.com/public/${property.image}`}
                        />
                      </div>
                      <div className='ViewPropertyCard__Details'>
                        <div className='CardContainer'>
                          <div className='ViewPropertyCard__ContactProfile'>
                            <img
                              className='ViewPropertyCard__ContactProfilePic'
                              alt={`${profile.firstName} ${profile.lastName} avatar`}
                              src={`https://${config.s3.BUCKET}.s3.amazonaws.com/public/${profile.image}`}
                            />
                            <div className='ViewPropertyCard__ContactInfo'>
                              <b className='ViewPropertyCard__PostedBy'>
                                Posted By {profile.firstName} {profile.lastName}
                                {property.lastName}
                              </b>
                              <p className='lightText'>(647) XXX-XXXX</p>
                            </div>
                          </div>
                          {infoSent ? (
                            <p>info is sent</p>
                          ) : (
                            <button
                              className='ViewPropertyCard__ContactButton secondary-btn'
                              onClick={
                                userEmail
                                  ? () => sendPropertyEmail()
                                  : () => setViewCreateAccountModal(true)
                              }
                            >
                              Contact
                            </button>
                          )}
                        </div>
                        <hr className='ViewPropertyCard__Separator' />
                        <div className='CardContainer'>
                          <table className='ViewPropertyCard__PriceBreakdown'>
                            <tbody>
                              <tr>
                                <td>After Repair Value</td>
                                <td>$650,000</td>
                              </tr>
                              <tr>
                                <td>Asking Price</td>
                                <td>$550,000</td>
                              </tr>
                              <tr>
                                <td>Repair Price</td>
                                <td>$50,000</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <hr className='ViewPropertyCard__Separator' />
                        <div className='CardContainer'>
                          <p className='midBold'>Estimated Profit</p>
                          <div className='ViewPropertyCard__EstimatedReturns'>
                            <div className='ViewPropertyCard__PercentageReturns'>
                              18%
                            </div>
                            <p className='midBold'>$100,000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className='ViewProperty__Details'>
                      <h3>Property Details</h3>

                      {/* <p>{property.description}</p> */}
                      <p className='lightText'>
                        4 bedrooms 1.5 bathrooms There is also a toilet in the
                        basement, however there isn’t a sink. That toilet is not
                        considered in the 1.5 bathrooms Built in 1910 Above
                        grade: 1448 sq ft Basement: 724 sq ft Low ceiling height
                        Flooring is hardwood and tile Vinyl windows
                        (15-years-old as per seller) Gas furnace (3-years-old)
                        Central air conditioning PEX plumbing for water supply
                        and ABS drains Wiring appears updated Closed in front
                        porch (could be redone to give a much better curb
                        appeal) Also includes side entrance Nice brick on front
                        of home On municipal services 3 parking spaces Lot size:
                        25 ft x 104 ft Zoning appears to allow for many uses
                        (Buyer to verify) PROPERTY NEEDS Cosmetic updating
                        required in kitchen and bathrooms Roof has a small leak
                        concentrated in the master bedroom Empty fibre glass oil
                        tank is still in the basement and should be removed
                      </p>

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
                            <td>Areas</td>
                            <td>1,800 sq.ft</td>
                          </tr>
                          <tr>
                            <td>Built</td>
                            <td>2010</td>
                          </tr>
                          <tr>
                            <td>Title</td>
                            <td>Freehold</td>
                          </tr>
                          <tr>
                            <td>Land Size</td>
                            <td>33.6 x 130 FT; Irregular - Irregular</td>
                          </tr>
                          <tr>
                            <td>Property Taxes</td>
                            <td>$6,390</td>
                          </tr>
                          <tr>
                            <td>Parking Type</td>
                            <td>{property.parking}</td>
                          </tr>
                          <tr>
                            <td>Building Type</td>
                            <td>House</td>
                          </tr>
                          <tr>
                            <td>Property Type</td>
                            <td>{property.propertyType}</td>
                          </tr>
                          <tr>
                            <td>Storeys</td>
                            <td>2</td>
                          </tr>
                          <tr>
                            <td>Community Name</td>
                            <td>Berczy Village</td>
                          </tr>
                        </tbody>
                      </table>

                      <h3>Why this Property?</h3>
                      <p>{property.whyThisProperty}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            ) : (
              <Loading />
            )}
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
