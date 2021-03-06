import { FormGroup, Col, Row } from "react-bootstrap";
import Dropdown from "react-dropdown";
import React, { useEffect, useRef, useState, Fragment } from "react";
import { API } from "aws-amplify";

import Loading from "./Loading";
import "./Properties.css";
import PropertiesMap from "../components/PropertiesMap";
import PropertyCard from "../components/PropertyCard";
import closeDropdownIcon from "../assets/close-dropdown-icon.png";
import openDropdownIcon from "../assets/open-dropdown-icon.png";
import {
  BEDROOM_FILTERS,
  BATHROOM_FILTERS,
  PROPERTY_TYPES,
  SORT_FILTERS,
} from "../helper/Data";
import { LOCATIONS_DATA } from "../helper/LocationData";
import { useWindowDimensions } from "../helper";

export default function Properties(props) {
  const { width: screenWidth } = useWindowDimensions();
  const mapViewEnabled = screenWidth > 992;

  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [location, setLocation] = useState("");
  const [propertySelected, setPropertySelected] = useState(null);
  const [propertyHovered, setPropertyHovered] = useState(null);
  const propertyCardsRef = useRef({});

  const [searchInput, setSearchInput] = useState("");
  const [searchDropdownExpanded, setSearchDropdownExpanded] = useState(false);
  const [filterPropertyType, setFilterPropertyType] = useState({
    value: "All",
  });
  const [filterBedrooms, setFilterBedrooms] = useState({ value: 0 });
  const [filterBathrooms, setFilterBathrooms] = useState({ value: 0 });
  const [filterSort, setFilterSort] = useState({ value: "Newest" });

  useEffect(() => {
    async function onLoad() {
      try {
        const properties = await loadProperties();
        setProperties(properties);
      } catch (e) {
        alert(e);
      }
      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated, location]);

  useEffect(() => {
    // scroll to Property Card when property is selected
    if (propertySelected) {
      const { propertyId } = propertySelected;
      propertyCardsRef.current[propertyId].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [propertySelected]);

  useEffect(() => {
    if (!searchInput) setLocation("");
  }, [searchInput]);

  function loadProperties() {
    // if (location) {
    //   return API.get("properties", "/properties", {
    //     queryStringParameters: {
    //       city: LOCATIONS_DATA[location].city,
    //       province: LOCATIONS_DATA[location].province,
    //     },
    //   });
    // } else {
    return API.get("properties", "/allproperties");
    // }
  }
  // Filter functions
  const resultsFilteredByDropdown = properties.filter((results) => {
    let isPropertyType =
      filterPropertyType.value === "All"
        ? true
        : results.propertyType === filterPropertyType.value;

    return (
      isPropertyType &&
      results.bedroom >= filterBedrooms.value &&
      results.bathroom >= filterBathrooms.value
    );
  });
  let searchProperties;
  if (filterSort === "Newest") {
    searchProperties = resultsFilteredByDropdown.sort(
      (a, b) => b.createdAt - a.createdAt
    );
  } else if (filterSort === "Oldest") {
    searchProperties = resultsFilteredByDropdown.sort(
      (a, b) => a.createdAt - b.createdAt
    );
  } else if (filterSort === "Price High-Low") {
    searchProperties = resultsFilteredByDropdown.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  } else {
    searchProperties = resultsFilteredByDropdown.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }

  // Location search bar functions
  const onSelectDropdownLocation = (event) => {
    const location = event.currentTarget.getAttribute("data-location");
    setLocation(location);
    setSearchInput(location);
    setSearchDropdownExpanded(false);
  };
  const onSearchInputChange = (input) => {
    const { value } = input.target;
    setSearchInput(value);
    if (value.length >= 2) {
      setSearchDropdownExpanded(true);
    } else {
      setSearchDropdownExpanded(false);
    }
  };
  const handleOnBlurSearch = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setSearchDropdownExpanded(false);
    }
  };
  const filteredData = (locationData, maxResults) => {
    let count = 0;
    return Object.keys(locationData).filter((location) => {
      return (
        location.toLowerCase().startsWith(searchInput.toLowerCase()) &&
        count++ < maxResults
      );
    });
  };

  return (
    <div className='Index'>
      <div className='Properties__Filter'>
        <div
          className='Properties__Filter-Container container'
          onBlur={handleOnBlurSearch}
        >
          <FormGroup
            controlId='filterPropertyType'
            className='Locations-Search-Bar'
          >
            <div className='Locations-Search-Bar__Wrapper'>
              <input
                type='text'
                placeholder='Search'
                value={searchInput}
                onChange={onSearchInputChange}
              />
              <a
                onClick={() =>
                  setSearchDropdownExpanded(!searchDropdownExpanded)
                }
                onBlur={() => setSearchDropdownExpanded(false)}
              >
                <img
                  src={
                    searchDropdownExpanded
                      ? closeDropdownIcon
                      : openDropdownIcon
                  }
                />
              </a>
            </div>
            <div
              className={`Locations-Search-Bar__Dropdown-Content ${
                searchDropdownExpanded ? "active" : ""
              }`}
            >
              {filteredData(LOCATIONS_DATA, 8).map((item) => (
                <a
                  onClick={onSelectDropdownLocation}
                  data-location={item}
                  key={item}
                  tabIndex='0'
                >
                  {item}
                </a>
              ))}
            </div>
          </FormGroup>
          <div className='Properties__Filter-Selection'>
            <Row>
              <Col md={6}>
                <FormGroup controlId='filterPropertyType'>
                  <p className='Property__Filter-Label'>Property Type</p>
                  <Dropdown
                    placeholder='All'
                    value={filterPropertyType.label}
                    options={PROPERTY_TYPES}
                    onChange={(event) => setFilterPropertyType(event)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup controlId='filterBedrooms'>
                  <p className='Property__Filter-Label'>Bedrooms</p>
                  <Dropdown
                    placeholder='Any'
                    value={filterBedrooms.label}
                    options={BEDROOM_FILTERS}
                    onChange={(event) => setFilterBedrooms(event)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup controlId='filterBathrooms'>
                  <p className='Property__Filter-Label'>Bathrooms</p>
                  <Dropdown
                    placeholder='Any'
                    value={filterBathrooms.label}
                    options={BATHROOM_FILTERS}
                    onChange={(event) => setFilterBathrooms(event)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup controlId='filterSort'>
                  <p className='Property__Filter-Label'>Sort By</p>
                  <Dropdown
                    placeholder='Newest'
                    value={filterSort.label}
                    options={SORT_FILTERS}
                    onChange={(event) => setFilterSort(event)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {!isLoading ? (
        <div className='Properties'>
          <div className='Properties__Results'>
            <p className='Properties__Results-Found'>
              {searchProperties.length} Properties found
            </p>
            {searchProperties.length > 0 ? (
              <Fragment>
                {location ? (
                  <h2>Properties in {location}</h2>
                ) : (
                  <h2>Showing all properties</h2>
                )}
                {searchProperties.map((property, index) => {
                  return (
                    <Col
                      key={index}
                      md={12}
                      sm={6}
                      xs={12}
                      style={{ padding: "0" }}
                    >
                      <PropertyCard
                        property={property}
                        setPropertyHovered={setPropertyHovered}
                        setPropertySelected={setPropertySelected}
                        landscapeMode={mapViewEnabled}
                        isSelected={
                          propertySelected &&
                          property.propertyId === propertySelected.propertyId
                        }
                        forwardRef={(ref, propertyId) => {
                          propertyCardsRef.current[propertyId] = ref;
                        }}
                      />
                    </Col>
                  );
                })}
              </Fragment>
            ) : (
              <Fragment>
                <h2>No Properties Found</h2>
                <p>Search again or adjust the filter options</p>
              </Fragment>
            )}
          </div>
          {mapViewEnabled && (
            <div className='Properties__MapContainer'>
              <PropertiesMap
                className='mapboxgl-map'
                properties={searchProperties}
                location={location}
                propertyHovered={propertyHovered}
                propertySelected={propertySelected}
                setPropertySelected={setPropertySelected}
              />
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
