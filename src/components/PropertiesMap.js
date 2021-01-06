import React, { Fragment, useState, useRef, useCallback } from "react";
import MapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapPinIcon from "../assets/map-pin-icon.png";
import PropertiesCard from "../components/PropertiesCard";

export const PropertiesMap = ({ properties }) => {
  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const [selectedProperties, setSelectedProperties] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 43.6532,
    longitude: -79.3832,
    zoom: 8,
    searchResultLayer: null,
  });
  const TOKEN =
    "pk.eyJ1IjoiZmlyZWhvYm8iLCJhIjoiY2s5aXdwOHQyMWUzZTNlcXQyejRzNTI1cyJ9.Mm2EY__EgXVLkeIcXnv1AQ";
  const geolocateStyle = {
    float: "right",
    margin: "10px",
    padding: "10px",
  };

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  const closePopup = () => {
    setSelectedProperties(null);
  };

  const loadPropertyMarkers = () => {
    if (properties) {
      console.log("PropertiesMap", properties);
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
    <Fragment>
      <div
        ref={geocoderContainerRef}
        style={{ position: "absolute", top: 20, left: 20, zIndex: 1 }}
      />
      <MapGL
        ref={mapRef}
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle='mapbox://styles/mapbox/navigation-preview-day-v2'
        onViewportChange={handleViewportChange}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={TOKEN}
          position='top-left'
        />
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          position='top-right'
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
      </MapGL>
    </Fragment>
  );
};

export default PropertiesMap;
