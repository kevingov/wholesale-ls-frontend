import React, { useState, useRef, useEffect } from "react";
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapPinIcon from "../assets/map-pin-icon.png";
import PropertiesCard from "../components/PropertiesCard";

export const PropertiesMap = ({ properties, geocoderRef }) => {
  const mapRef = useRef();
  const [selectedProperties, setSelectedProperties] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 43.8767,
    longitude: -79.2633,
    zoom: 11,
    searchResultLayer: null,
  });
  const TOKEN =
    "pk.eyJ1IjoiZmlyZWhvYm8iLCJhIjoiY2s5aXdwOHQyMWUzZTNlcXQyejRzNTI1cyJ9.Mm2EY__EgXVLkeIcXnv1AQ";

  const handleViewportChange = (viewport) => {
    const { width, height, ...etc } = viewport;
    setViewport(etc);
  };

  const handleGeocoderViewportChange = (newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  };

  const closePopup = () => {
    setSelectedProperties(null);
  };

  const loadPropertyMarkers = () => {
    if (properties) {
      return properties.map((spot) => {
        return (
          <Marker
            key={spot.propertyId}
            latitude={parseFloat(spot.latitude)}
            longitude={parseFloat(spot.longitude)}
          >
            <img
              className='markerImage'
              onClick={() => {
                setSelectedProperties(spot);
              }}
              src={mapPinIcon}
              alt='Map Pin Icon'
            />
          </Marker>
        );
      });
    }
  };

  return (
    <ReactMapGL
      ref={mapRef}
      width='100%'
      height='100%'
      {...viewport}
      mapboxApiAccessToken={TOKEN}
      mapStyle='mapbox://styles/mapbox/navigation-preview-day-v2'
      onViewportChange={handleViewportChange}
    >
      <Geocoder
        mapRef={mapRef}
        containerRef={geocoderRef}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={TOKEN}
        marker={false}
        countries='CA'
        types='place, locality, neighborhood'
      />
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      <NavigationControl />
      {loadPropertyMarkers()}
      {selectedProperties !== null ? (
        <Popup
          latitude={parseFloat(selectedProperties.latitude)}
          longitude={parseFloat(selectedProperties.longitude)}
          onClose={closePopup}
        >
          <PropertiesCard property={selectedProperties} />
        </Popup>
      ) : null}
    </ReactMapGL>
  );
};

export default PropertiesMap;
