import React, { useState, useRef, useEffect, useCallback } from "react";
import MapGL, {
  NavigationControl,
  Marker,
  Popup,
  Layer,
  Source,
  FlyToInterpolator,
} from "react-map-gl";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";

import PropertyCardPopup from "./PropertyCardPopup";

const TOKEN =
  "pk.eyJ1IjoiZmlyZWhvYm8iLCJhIjoiY2s5aXdwOHQyMWUzZTNlcXQyejRzNTI1cyJ9.Mm2EY__EgXVLkeIcXnv1AQ";

const polygonLayer = {
  id: "zone",
  type: "line",
  source: "zone",
  paint: {
    "line-color": "#1e7551",
    "line-width": 4,
  },
};
const clusterLayer = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 8,
    "circle-color": "#545454",
    "circle-opacity": 0,
  },
};

export const PropertiesMap = ({
  properties,
  location,
  propertySelected,
  setPropertySelected,
  propertyHovered,
  setPropertyHovered,
}) => {
  const mapRef = useRef();
  const [polygonFeatures, setPolygonFeatures] = useState({});
  const [viewport, updateViewport] = useState({
    latitude: 43.6534817,
    longitude: -79.3839347,
    zoom: 10,
    searchResultLayer: null,
  });

  useEffect(() => {
    if (location) {
      const URI = encodeURI(
        `https://nominatim.openstreetmap.org/search/${location}?format=json&limit=1&polygon_geojson=1`
      ); // nominatim API
      handleGeojsonZone(URI);
    }
  }, [location]);

  const handleGeojsonZone = (URI) => {
    axios
      .get(URI)
      .then((res) => {
        if (res && res.data.length > 0) {
          const coordinates = res.data[0].geojson.coordinates;
          const lat = parseFloat(res.data[0].lat);
          const lon = parseFloat(res.data[0].lon);
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
          flyTo(lon, lat);
          // console.log(res);
        }
      })
      .catch((err) => console.log(err.response));
  };

  const pointFeatures = useCallback(() => {
    const features = [];
    properties.map((point) => {
      const coordinates = [point.longitude, point.latitude];
      const feature = {
        properties: { propertyId: point.propertyId },
        type: "Feature",
        geometry: { type: "Point", coordinates },
      };
      features.push(feature);
    });
    return features;
  }, [properties]);
  pointFeatures();

  const handleViewportChange = useCallback(
    (newViewport) => updateViewport(newViewport),
    []
  );

  const flyTo = (lon, lat) => {
    updateViewport({
      ...viewport,
      longitude: lon,
      latitude: lat,
      zoom: 10,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 800,
    });
  };

  const loadPropertyMarkers = () =>
    properties.map((point) => {
      const isSelectedOrHovered =
        (propertySelected &&
          point.propertyId === propertySelected.propertyId) ||
        (propertyHovered && point.propertyId === propertyHovered.propertyId);
      return (
        <Marker
          key={point.propertyId}
          latitude={parseFloat(point.latitude)}
          longitude={parseFloat(point.longitude)}
          offsetLeft={-8}
          offsetTop={-8}
        >
          <div
            className={`mapbox-point ${isSelectedOrHovered ? " selected" : ""}`}
            onClick={() => setPropertySelected(point)}
          />
        </Marker>
      );
    });

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
      {properties && loadPropertyMarkers()}
      {propertySelected && (
        <Popup
          latitude={parseFloat(propertySelected.latitude)}
          longitude={parseFloat(propertySelected.longitude)}
          onClose={() => setPropertySelected(null)}
        >
          <PropertyCardPopup property={propertySelected} />
        </Popup>
      )}
      <Source
        type='geojson'
        data={{
          type: "FeatureCollection",
          features: polygonFeatures,
        }}
      >
        <Layer {...polygonLayer} />
      </Source>
      <Source
        type='geojson'
        data={{
          type: "FeatureCollection",
          features: pointFeatures(),
        }}
      >
        <Layer {...clusterLayer} />
      </Source>
    </MapGL>
  );
};

export default PropertiesMap;
