import React, { useState, useRef, useEffect, useCallback } from "react";
import MapGL, {
  NavigationControl,
  Marker,
  Popup,
  Layer,
  Source,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";

import mapPinIcon from "../assets/map-pin-icon.png";
import PropertiesCard from "../components/PropertiesCard";

const TOKEN =
  "pk.eyJ1IjoiZmlyZWhvYm8iLCJhIjoiY2s5aXdwOHQyMWUzZTNlcXQyejRzNTI1cyJ9.Mm2EY__EgXVLkeIcXnv1AQ";

const layerStyle = {
  id: "zone",
  type: "fill",
  source: "zone",
  paint: {
    "fill-color": "#3ab984",
    "fill-opacity": 0.25,
  },
};

export const PropertiesMap = ({
  properties,
  geocoderRef,
  locationSelected,
  setLocationSelected,
  propertySelected,
  setPropertySelected,
}) => {
  const mapRef = useRef();
  const [polygonFeatures, setPolygonFeatures] = useState({});
  const [viewport, setViewport] = useState({
    latitude: 43.6534817,
    longitude: -79.3839347,
    zoom: 10,
  });

  useEffect(() => {
    const province = "Ontario";
    const URI = encodeURI(
      `https://nominatim.openstreetmap.org/search/${locationSelected} ${province}?format=json&limit=1&polygon_geojson=1`
    ); // nominatim API
    handleGeojsonFeatures(URI);
  }, [locationSelected]);

  const handleGeojsonFeatures = (URI) => {
    axios
      .get(URI)
      .then((res) => {
        if (res && res.data.length > 0) {
          const coordinates = res.data[0].geojson.coordinates;
          const feature = [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates,
              },
            },
          ];
          setPolygonFeatures(feature);
        }
      })
      .catch((err) => console.log(err.response));
  };

  const handleViewportChange = useCallback((newViewport) => {
    const { width, height, ...etc } = newViewport;
    setViewport(etc);
  }, []);

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = {
        transitionDuration: 800,
      };
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  const closePopup = () => {
    setPropertySelected(null);
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
                setPropertySelected(spot);
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
    <MapGL
      ref={mapRef}
      {...viewport}
      width='100%'
      height='100%'
      onViewportChange={handleViewportChange}
      mapboxApiAccessToken={TOKEN}
      mapStyle='mapbox://styles/mapbox/navigation-preview-day-v2'
    >
      <Geocoder
        mapRef={mapRef}
        containerRef={geocoderRef}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={TOKEN}
        marker={false}
        countries='CA'
        types='place, locality, neighborhood'
        onResult={(res) => {
          const { text: location } = res.result;
          setLocationSelected(location);
        }}
      />
      <NavigationControl />
      {loadPropertyMarkers()}
      {propertySelected !== null ? (
        <Popup
          latitude={parseFloat(propertySelected.latitude)}
          longitude={parseFloat(propertySelected.longitude)}
          onClose={closePopup}
        >
          <PropertiesCard property={propertySelected} />
        </Popup>
      ) : null}
      <Source
        type='geojson'
        data={{
          type: "FeatureCollection",
          features: polygonFeatures,
        }}
      >
        <Layer {...layerStyle} />
      </Source>
    </MapGL>
  );
};

export default PropertiesMap;
