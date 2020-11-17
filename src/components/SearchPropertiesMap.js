import React, { Fragment, useState, useRef, useCallback } from "react";
import MapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import config from "../config";
import mapPinIcon from "../assets/map-pin-icon.png";

export const SearchPropertiesMap = ({ properties }) => {
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
      return properties.map((spot) => {
        return (
          <Marker
            key={spot.objectid}
            latitude={parseFloat(spot.latitude)}
            longitude={parseFloat(spot.longitude)}
          >
            <img
              class='markerImage'
              onClick={() => {
                setSelectedProperties(spot);
              }}
              src='https://wholesale-ls-marketing.s3.amazonaws.com/Icons/bed.svg'
              alt=''
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
            <div className='SearchPropertiesCard'>
                <a
                  href={`/properties/${selectedProperties.propertyId}`}
                  className='SearchPropertiesCard__Image-Container'
                >
                  <img
                    alt={`${selectedProperties.address} - Focus Property`}
                    src={`https://${config.s3.BUCKET}.s3.amazonaws.com/public/${selectedProperties.image}`}
                  />
                </a>
                <div className='SearchPropertiesCard__Details'>
                  <h3 className='SearchPropertiesCard__Title'>
                    {selectedProperties.title.length > 45
                      ? selectedProperties.title.slice(0, 45) + " ..."
                      : selectedProperties.title}
                  </h3>
                  <div className='SearchPropertiesCard__Address'>
                    <img src={mapPinIcon} alt='Map Pin Icon' />
                    {/* <p>{property.address}</p> */}
                    <p className='lightText'>1025 Sesame Street, Aurora ON</p>
                  </div>
                  <div className='SearchProperties__Row-Highlights'>
                    {selectedProperties.bedroom && <div>{selectedProperties.bedroom} Bedrooms</div>}
                    {selectedProperties.bathroom && (
                      <div>{selectedProperties.bathroom} Bathrooms</div>
                    )}
                    {selectedProperties.propertType && <div>{selectedProperties.propertyType}</div>}
                  </div>
                  <div className='SearchProperties__Row-Pricing'>
                    <div className='SearchProperties__Row-Pricing-Item'>
                      <p>Asking</p>
                      <p>$500,000</p>
                    </div>
                    <div className='SearchProperties__Row-Pricing-Item'>
                      <p>Nearby</p>
                      <p>$620,000</p>
                    </div>
                    <div className='SearchProperties__Row-Pricing-Item SearchProperties__Row-Pricing-Item--Profit'>
                      <p>Est. Profit</p>
                      <p>$120,000</p>
                    </div>
                  </div>
                </div>
              </div>


          </Popup>
        ) : null}
      </MapGL>
    </Fragment>
  );
};

export default SearchPropertiesMap;
