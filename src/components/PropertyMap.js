import React, { useState, useRef, useCallback } from "react";
import MapGL, { NavigationControl, Marker } from "react-map-gl";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapPinIcon from "../assets/map-pin-icon.png";

const TOKEN =
  "pk.eyJ1IjoiZmlyZWhvYm8iLCJhIjoiY2s5aXdwOHQyMWUzZTNlcXQyejRzNTI1cyJ9.Mm2EY__EgXVLkeIcXnv1AQ";

export const PropertyMap = ({ latitude, longitude }) => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 10,
    searchResultLayer: null,
  });

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  return (
    <MapGL
      ref={mapRef}
      {...viewport}
      width='100%'
      height='100%'
      mapboxApiAccessToken={TOKEN}
      mapStyle='mapbox://styles/mapbox/navigation-preview-day-v2'
      onViewportChange={handleViewportChange}
    >
      <NavigationControl />
      <Marker latitude={parseFloat(latitude)} longitude={parseFloat(longitude)}>
        <img className='markerImage' src={mapPinIcon} alt='Map Pin Icon' />
      </Marker>
    </MapGL>
  );
};

export default PropertyMap;
