import React from "react";

import mapPinIcon from "../assets/map-pin-icon.png";
import "./PropertiesCard.css";

const PropertiesCardMini = ({ property, index }) => (
  <div
    key={index ? "Property " + index : ""}
    className='PropertiesCard PropertiesCard--Mini'
  >
    <div className='PropertiesCard__Details PropertiesCard--Mini__Details'>
      <h3 className='PropertiesCard__Title'>
        {property.title.length > 55
          ? property.title.slice(0, 55) + " ..."
          : property.title}
      </h3>
      <div className='PropertiesCard__Address'>
        <img src={mapPinIcon} alt='Map Pin Icon' />
        <p>{property.address}</p>
      </div>
    </div>
  </div>
);

export default PropertiesCardMini;
