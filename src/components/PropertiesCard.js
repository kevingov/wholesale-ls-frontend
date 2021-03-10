import React from "react";

import config from "../config";
import mapPinIcon from "../assets/map-pin-icon.png";
import bedIcon from "../assets/bed-icon.png";
import bathIcon from "../assets/bath-icon.png";
import { numberWithCommas } from "../helper";
import "./PropertiesCard.css";

const PropertiesCard = ({ property, index, isSelected }) => (
  <div
    key={index ? "Property " + index : ""}
    className={`PropertiesCard ${isSelected ? " selected" : ""}`}
  >
    <a
      href={`/properties/${property.propertyId}`}
      className='PropertiesCard__Image-Container'
    >
      <img
        alt={`${property.address} - Focus Property`}
        src={`https://${config.s3.BUCKET}.s3.amazonaws.com/public/${property.image[0]}`}
      />
    </a>
    <div className='PropertiesCard__Details'>
      <h3 className='PropertiesCard__Title'>
        {property.title.length > 55
          ? property.title.slice(0, 55) + " ..."
          : property.title}
      </h3>
      <div className='PropertiesCard__Address'>
        <img src={mapPinIcon} alt='Map Pin Icon' />
        <p>{property.address}</p>
      </div>
      <div className='PropertiesCard__Row-Highlights'>
        {property.bedroom && (
          <div className='PropertiesCard__Highlight'>
            <img src={bedIcon} />
            <p>
              {property.bedroom + (property.bedroom > 1 ? " Beds" : " Bed")}
            </p>
          </div>
        )}
        {property.bathroom && (
          <div className='PropertiesCard__Highlight'>
            <img src={bathIcon} />
            <p>
              {property.bathroom + (property.bathroom > 1 ? " Baths" : " Bath")}
            </p>
          </div>
        )}
        {property.propertType && <div>{property.propertyType}</div>}
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
          <p>${(property.nearbyPrice - property.price).toLocaleString()}</p>
        </div>
      </div>
    </div>
  </div>
);

export default PropertiesCard;
