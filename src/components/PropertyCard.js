import React from "react";

import config from "../config";
import mapPinIcon from "../assets/map-pin-icon.png";
import bedIcon from "../assets/bed-icon.png";
import bathIcon from "../assets/bath-icon.png";
import { numberWithCommas } from "../helper";
import "./PropertyCard.css";

const PropertyCard = ({
  property,
  setPropertySelected,
  setPropertyHovered,
  isSelected,
  index,
  forwardRef,
  landscapeMode,
}) => (
  <div
    key={index ? "Property " + index : ""}
    className={`PropertyCard ${
      landscapeMode ? " PropertyCard--Landscape" : ""
    } ${isSelected ? " selected" : ""}`}
    onClick={() => setPropertySelected(property)}
    onMouseEnter={() => setPropertyHovered(property)}
    onMouseLeave={() => setPropertyHovered(null)}
    ref={(ref) => forwardRef(ref, property.propertyId)}
  >
    <a
      href={`/properties/${property.propertyId}`}
      className={`PropertyCard__Image-Container ${
        landscapeMode ? " PropertyCard__Image-Container--Landscape" : ""
      }`}
    >
      <img
        alt={`${property.address} - Focus Property`}
        src={`https://${config.s3.BUCKET}.s3.amazonaws.com/public/${property.image[0]}`}
      />
    </a>
    <div
      className={`PropertyCard__Details ${
        landscapeMode ? " PropertyCard__Details--Landscape" : ""
      }`}
    >
      <h3 className='PropertyCard__Title'>
        {property.title.length > 55
          ? property.title.slice(0, 55) + " ..."
          : property.title}
      </h3>
      <div className='PropertyCard__Address'>
        <img src={mapPinIcon} alt='Map Pin Icon' />
        <p>{property.address}</p>
      </div>
      <div className='PropertyCard__Row-Highlights'>
        {property.bedroom && (
          <div className='PropertyCard__Highlight'>
            <img src={bedIcon} />
            <p>
              {property.bedroom + (property.bedroom > 1 ? " Beds" : " Bed")}
            </p>
          </div>
        )}
        {property.bathroom && (
          <div className='PropertyCard__Highlight'>
            <img src={bathIcon} />
            <p>
              {property.bathroom + (property.bathroom > 1 ? " Baths" : " Bath")}
            </p>
          </div>
        )}
        {property.propertType && <div>{property.propertyType}</div>}
      </div>
      <div className='PropertyCard__Row-Pricing'>
        <div className='PropertyCard__Row-Pricing-Item'>
          <p>Asking</p>
          <p>${numberWithCommas(property.price)}</p>
        </div>
        <div className='PropertyCard__Row-Pricing-Item'>
          <p>Nearby</p>
          <p>${numberWithCommas(property.nearbyPrice)}</p>
        </div>
        <div className='PropertyCard__Row-Pricing-Item PropertyCard__Row-Pricing-Item--Profit'>
          <p>Est. Profit</p>
          <p>${(property.nearbyPrice - property.price).toLocaleString()}</p>
        </div>
      </div>
    </div>
  </div>
);

export default PropertyCard;
