import React from "react";

import config from "../config";
import mapPinIcon from "../assets/map-pin-icon.png";
import "./PropertiesCard.css";



const PropertiesCard = ({ property, index }) => (
  <div key={index ? "Property " + index : ""} className='PropertiesCard'>
    <a
      href={`/properties/${property.propertyId}`}
      className='PropertiesCard__Image-Container'
    >
      <img
        alt={`${property.address} - Focus Property`}
        src={`https://${config.s3.BUCKET}.s3.amazonaws.com/public/${property.image}`}
      />
    </a>
    <div className='PropertiesCard__Details'>
      <h3 className='PropertiesCard__Title'>
        {property.title.length > 45
          ? property.title.slice(0, 45) + " ..."
          : property.title}
      </h3>
      <div className='PropertiesCard__Address'>
        <img src={mapPinIcon} alt='Map Pin Icon' />
        {/* <p>{property.address}</p> */}
        <p className='lightText'>1025 Sesame Street, Aurora ON</p>
      </div>
      <div className='PropertiesCard__Row-Highlights'>
        {property.bedroom && <div>{property.bedroom} Bedrooms</div>}
        {property.bathroom && <div>{property.bathroom} Bathrooms</div>}
        {property.propertType && <div>{property.propertyType}</div>}
      </div>
      <div className='PropertiesCard__Row-Pricing'>
        <div className='PropertiesCard__Row-Pricing-Item'>
          <p>Asking</p>
          <p>${property.price}</p>
        </div>
        <div className='PropertiesCard__Row-Pricing-Item'>
          <p>Nearby</p>
          <p>${property.nearbyPrice}</p>
        </div>
        <div className='PropertiesCard__Row-Pricing-Item PropertiesCard__Row-Pricing-Item--Profit'>
          <p>Est. Profit</p>
          <p>$120,000</p>
        </div>
      </div>
    </div>
  </div>
);

export default PropertiesCard;
