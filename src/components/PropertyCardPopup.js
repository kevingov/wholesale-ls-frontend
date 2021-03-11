import React from "react";

import mapPinIcon from "../assets/map-pin-icon.png";
import "./PropertyCardPopup.css";

const PropertyCardPopup = ({ property, index }) => (
  <div key={index ? "Property " + index : ""} className='PropertyCardPopup'>
    <div className='PropertyCardPopup__Details'>
      <h3 className='PropertyCardPopup__Title'>
        {property.title.length > 55
          ? property.title.slice(0, 55) + " ..."
          : property.title}
      </h3>
      <div className='PropertyCardPopup__Address'>
        <img src={mapPinIcon} alt='Map Pin Icon' />
        <p>{property.address}</p>
      </div>
    </div>
  </div>
);

export default PropertyCardPopup;
