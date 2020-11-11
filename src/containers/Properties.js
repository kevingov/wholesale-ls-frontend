import "./Properties.css";

import {
  Col,
  FormGroup,
  Row,
  Breadcrumb,
  FormControl,
} from "react-bootstrap";
import Dropdown from "react-dropdown";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { API } from "aws-amplify";
import Loading from "./Loading";
import config from "../config";
import MapGL, {GeolocateControl, NavigationControl, Marker, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default function Properties(props) {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterPropertyType, setFilterPropertyType] = useState("");
  const [filterBedrooms, setFilterBedrooms] = useState(0);
  const [filterBathrooms, setFilterBathrooms] = useState(0);
  const [filterSort, setFilterSort] = useState("");
  const [filterText, setFilterText] = useState("");
  const [viewport, setViewport] = useState({
    width: "40vw",
    height: "100vh",
    latitude: 45.4215,
    longitude: -75.6972,
    zoom: 8,
    searchResultLayer: null,
  });
  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
 
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    []
  );
  const TOKEN="pk.eyJ1IjoiZmlyZWhvYm8iLCJhIjoiY2s5aXdwOHQyMWUzZTNlcXQyejRzNTI1cyJ9.Mm2EY__EgXVLkeIcXnv1AQ"
  const geolocateStyle = {
    float: 'right',
    margin: '10px',
    padding: '10px'
  };
  const [selectedProperties, setSelectedProperties] = useState(null);

  const loadPropertyMarkers = () => {
    return properties.map(spot => {
      return (
        <Marker
           key={spot.objectid}
           latitude={parseFloat(spot.latitude)}
           longitude={parseFloat(spot.longitude)}
        >
          <img 
          class="markerImage"
          onClick={() => {
            setSelectedProperties(spot);
          }}
          src="https://wholesale-ls-marketing.s3.amazonaws.com/Icons/bed.svg" 
          alt="" />
        </Marker>
      );
    });
  };

  useEffect(() => {
    async function onLoad() {
      try {
        const properties = await loadProperties();
        setProperties(properties);
        setFilterBedrooms(0);
        setFilterBathrooms(0);
        console.log(properties);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);


  function loadProperties() {
    return API.get('properties', '/properties', {
      'queryStringParameters': {
        'filterBedrooms': filterBedrooms,
        'filterBathrooms': filterBathrooms,
      }
    })
  }

  const closePopup = () => {
    setSelectedProperties(null)
  }

  const updateFilterPropertyType = event => {
    setFilterPropertyType(event.value);
  }

  const updateFilterBedrooms = event => {
    setFilterBedrooms(event.value);
  }

  const updateFilterBathrooms = event => {
    setFilterBathrooms(event.value);
  }

  const updateFilterSort = event => {
    setFilterSort(event.value);
  }
  
  const resultsFilteredByDropdown = properties.filter(results => {         
    console.log(filterPropertyType);
    if (filterPropertyType === "") {
      return results
    } else {
      return (results.propertyType === filterPropertyType
        && results.bedroom > filterBedrooms
        && results.bathroom > filterBathrooms)
    }
  });

  let sortedProperties;
  if (filterSort === "Newest") {
    sortedProperties = resultsFilteredByDropdown.sort((a, b) => b.createdAt - a.createdAt)
  } else if (filterSort === "Oldest") {
    sortedProperties = resultsFilteredByDropdown.sort((a, b) => a.createdAt - b.createdAt)
  } else if (filterSort === "Price High-Low") {
    sortedProperties = resultsFilteredByDropdown.sort((a, b) => Number(a.price) - Number(b.price)) 
  } else {
    sortedProperties = resultsFilteredByDropdown.sort((a, b) => Number(b.price) - Number(a.price))
  }

  // let searchProperties;
  // if (filterText === "") {
  //   searchProperties = sortedProperties
  // } else {
  //   searchProperties = sortedProperties.filter(results => {
  //     return results.title.toLowerCase().includes( filterText.toLowerCase() )
  //   })
  // }
  
  const searchProperties = sortedProperties.filter(results => {
    return results.title.toLowerCase().includes( filterText.toLowerCase() )
  })

  return (
    <div className="Index">
    <div className="Breadcrumbs">
      <div className="Breadcrumbs-items container">
        <Breadcrumb>
          <Breadcrumb.Item active>Properties</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
    <div className="All-Properties container">
      {!isLoading ? (
        <Row>
          <Col xs={6}>
            <Row className="Filters">
              <Col xs={3}>
                <FormGroup controlId="filterPropertyType">
                  <br />
                  <FormControl 
                    type="text" 
                    placeholder="Search" 
                    onChange={ e => setFilterText(e.target.value)}>
                  </FormControl>
                  <br />
                  <br />
                </FormGroup>
              </Col>
              <Col xs={1}>
              </Col>
              <Col xs={2}>
              <FormGroup controlId="filterPropertyType">
                <br />
                <Dropdown
                  placeholder="Property Types"
                  value={filterPropertyType}
                  options={[
                    {
                      label: "Detached",
                      value: "Detached",
                    },
                    {
                      label: "Semi-Detached",
                      value: "Semi-Detached",
                    },
                    {
                      label: "Townhome",
                      value: "Townhome",
                    },
                    {
                      label: "Condo",
                      value: "Condo",
                    },
                    {
                      label: "Multi-family",
                      value: "Multi-family",
                    },
                  ]}
                  onChange={updateFilterPropertyType}
                />
                <br />
                <br />
              </FormGroup>
                
              </Col>
              <Col xs={2}>
                <FormGroup controlId="filterBedrooms">
                  <br />
                  <Dropdown
                    placeholder="Bedrooms"
                    value={filterBedrooms}
                    options={[
                      {
                        label: "Any",
                        value: 0,
                      },
                      {
                        label: "2+",
                        value: 2,
                      },
                      {
                        label: "3+",
                        value: 3,
                      },
                      {
                        label: "4+",
                        value: 4,
                      },
                    ]}
                    onChange={updateFilterBedrooms}
                  />
                  <br />
                  <br />
                </FormGroup>
              </Col>
              <Col xs={2}>
                <FormGroup controlId="filterBathrooms">
                  <br />
                  <Dropdown
                    placeholder="Bathrooms"
                    value={filterBathrooms}
                    options={[
                      {
                        label: "Any",
                        value: 0,
                      },
                      {
                        label: "2+",
                        value: 2,
                      },
                      {
                        label: "3+",
                        value: 3,
                      },
                      {
                        label: "4+",
                        value: 4,
                      },
                    ]}
                    onChange={updateFilterBathrooms}
                  />
                  <br />
                  <br />
                </FormGroup>
              </Col>
              <Col xs={2}>
              <FormGroup controlId="filterSort">
                <br />
                <Dropdown
                  placeholder="Sort By"
                  value={filterSort}
                  options={[
                    {
                      label: "Newest",
                      value: "Newest",
                    },
                    {
                      label: "Oldest",
                      value: "Oldest",
                    },
                    {
                      label: "Price High-Low",
                      value: "Price High-Low",
                    },
                    {
                      label: "Price Low-High",
                      value: "Price Low-High",
                    },
                  ]}
                  onChange={updateFilterSort}
                />
                <br />
                <br />
                </FormGroup>
              </Col>
            </Row>

            {searchProperties 
            .map((property, i) => (
              <Col key={i} sm={4}>
              <a href={`/properties/${property.propertyId}`}>
                <div className="Property">
                  <div
                    style={{
                      backgroundImage: `url(https://${config.s3.BUCKET}.s3.amazonaws.com/public/${property.image})`,
                      backgroundSize: "cover",
                      height: "200px",
                      borderRadius: "5px",
                      marginBottom: "5px",
                    }}
                    className="propertyImage"
                  ></div>
                  <div className="Property-Title">
                    <p>
                        {property.title.length > 45
                        ? property.title.slice(0, 45) + " ..."
                        : property.title}
                    </p>
                  </div>
                  
                    <div className="Price">
                      <p>$ {property.price}</p>
                    </div>
                  
                  
                  <Row className="Row-Highlights">
                    <Col xs={3} className="Property-Highlights">
                      <p> {property.bedroom} Bedrooms</p>
                    </Col>
                    <Col xs={3} className="Property-Highlights">
                      <p> {property.bathroom} Bathrooms</p>
                    </Col>
                    <Col xs={3} className="Property-Highlights">
                      <p> {property.propertyType} </p>
                    </Col>
                    <Col xs={3} className="Property-Highlights">
                      <p> {property.city} </p>
                    </Col>
                  </Row>
                </div>
                
              </a>
              <br />
              <br />
            </Col>
            ))}
          </Col>

          <Col xs={6}>
            <div 
              ref={geocoderContainerRef}
              style={{ position: "absolute", top:20, left: 20, zIndex: 1}}
              />
          <MapGL
            ref={mapRef}
            {...viewport}
            mapboxApiAccessToken={TOKEN}
            mapStyle="mapbox://styles/mapbox/navigation-preview-day-v2"
            onViewportChange={handleViewportChange}
          >
            <Geocoder 
              mapRef={mapRef}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={TOKEN}
              position="top-left"
            />
            <GeolocateControl
              style={geolocateStyle}
              positionOptions={{enableHighAccuracy: true}}
              trackUserLocation={true}
              position="top-right"
            />
            <NavigationControl />
            {loadPropertyMarkers()}
            {selectedProperties !== null ? (
              <Popup
                latitude={parseFloat(selectedProperties.latitude)}
                longitude={parseFloat(selectedProperties.longitude)}
                onClose={closePopup}
              >
                <p>HotSpot Information</p>
              </Popup>
              ) : null}
          </MapGL>
          </Col>
        </Row>


      ) : (
        <Loading />
      )}
    </div>
    </div>
  );
}
