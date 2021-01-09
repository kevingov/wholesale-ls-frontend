import { Col, Breadcrumb } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import config from "../config";
import mapPinIcon from "../assets/map-pin-icon.png";
import "./UserDashboard.css";
import { numberWithCommas } from "../helper";

import { API } from "aws-amplify";

export default function UserDashboard() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      try {
        const properties = await loadProperties();
        setProperties(properties);
        console.log(properties);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, []);

  function loadProperties() {
    return API.get("properties", "/allproperties");
  }
  console.log(properties);
  return (
    <div className='Index'>
      <div className='Breadcrumbs'>
        <div className='Breadcrumbs-items container'>
          <Breadcrumb>
            <Breadcrumb.Item href='/properties'>Properties</Breadcrumb.Item>
            <Breadcrumb.Item active>My Properties</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className='container'>
        {!isLoading ? (
          <div className='Dashboard'>
            <p className='Dashboard__Results-Found'>
              {Object.keys(properties).length} Properties found
            </p>
            <h1>My Saved Properties</h1>
            {properties.map((property, i) => (
              <Col key={i} md={4}>
                <div
                  key={("Property", i)}
                  className='PropertiesCard PropertiesCard--Dashboard'
                >
                  <a
                    href={`/properties/${property.propertyId}`}
                    className='PropertiesCard__Image-Container PropertiesCard__Image-Container--Dashboard'
                  >
                    <img
                      alt={`${property.address} - Focus Property`}
                      src={`https://${config.s3.BUCKET}.s3.amazonaws.com/public/${property.image}`}
                    />
                  </a>
                  <div className='PropertiesCard__Details PropertiesCard__Details--Dashboard'>
                    <h3 className='PropertiesCard__Title'>
                      {property.title.length > 75
                        ? property.title.slice(0, 75) + " ..."
                        : property.title}
                    </h3>
                    <div className='PropertiesCard__Address'>
                      <img src={mapPinIcon} alt='Map Pin Icon' />
                      {/* <p>{property.address}</p> */}
                      <p className='lightText'>1025 Sesame Street, Aurora ON</p>
                    </div>
                    <div className='PropertiesCard__Row-Highlights'>
                      {property.bedroom && (
                        <div>{property.bedroom} Bedrooms</div>
                      )}
                      {property.bathroom && (
                        <div>{property.bathroom} Bathrooms</div>
                      )}
                      {property.propertType && (
                        <div>{property.propertyType}</div>
                      )}
                    </div>
                    <div className='PropertiesCard__Row-Pricing'>
                      <div className='PropertiesCard__Row-Pricing-Item'>
                        <p>Asking</p>
                        <p>${numberWithCommas(property.price)}</p>
                      </div>
                      <div className='PropertiesCard__Row-Pricing-Item'>
                        <p>Nearby</p>
                        <p>${numberWithCommas(property.nearbyPrice)}</p>
                      </div>
                      <div className='PropertiesCard__Row-Pricing-Item PropertiesCard__Row-Pricing-Item--Profit'>
                        <p>Est. Profit</p>
                        <p>$120,000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
