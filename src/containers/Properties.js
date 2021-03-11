import { FormGroup } from "react-bootstrap";
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
  PROPERTY_TYPE_FILTERS,
  SORT_FILTERS,
} from "../helper/Data";
import { LOCATIONS_ALL } from "../helper/LocationData";

export default function Properties(props) {
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

  // function loadProperties() {
  //   return API.get("properties", "/properties", {
  //     queryStringParameters: {
  //       filterBedrooms: filterBedrooms,
  //       filterBathrooms: filterBathrooms,
  //     },
  //   });
  // }

  function loadProperties() {
    return API.get("properties", "/allproperties");
  }

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
  const filteredLocations = () => {
    const MAX_RESULTS = 8;
    let count = 0;
    return Object.keys(LOCATIONS_ALL).filter((location) => {
      return (
        location.toLowerCase().startsWith(searchInput.toLowerCase()) &&
        count++ < MAX_RESULTS
      );
    });
  };

  console.log(propertyCardsRef);

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
              {filteredLocations().map((item) => (
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
          <FormGroup controlId='filterPropertyType'>
            <p className='Property__Filter-Label'>Property Type</p>
            <Dropdown
              placeholder='All'
              value={filterPropertyType.label}
              options={PROPERTY_TYPE_FILTERS}
              onChange={(event) => setFilterPropertyType(event)}
            />
          </FormGroup>
          <FormGroup controlId='filterBedrooms'>
            <p className='Property__Filter-Label'>Bedrooms</p>
            <Dropdown
              placeholder='Any'
              value={filterBedrooms.label}
              options={BEDROOM_FILTERS}
              onChange={(event) => setFilterBedrooms(event)}
            />
          </FormGroup>
          <FormGroup controlId='filterBathrooms'>
            <p className='Property__Filter-Label'>Bathrooms</p>
            <Dropdown
              placeholder='Any'
              value={filterBathrooms.label}
              options={BATHROOM_FILTERS}
              onChange={(event) => setFilterBathrooms(event)}
            />
          </FormGroup>
          <FormGroup controlId='filterSort'>
            <p className='Property__Filter-Label'>Sort By</p>
            <Dropdown
              placeholder='Newest'
              value={filterSort.label}
              options={SORT_FILTERS}
              onChange={(event) => setFilterSort(event)}
            />
          </FormGroup>
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
                    <PropertyCard
                      key={("Property", index)}
                      property={property}
                      setPropertyHovered={setPropertyHovered}
                      setPropertySelected={setPropertySelected}
                      isSelected={
                        propertySelected &&
                        property.propertyId === propertySelected.propertyId
                      }
                      forwardRef={(ref, propertyId) => {
                        propertyCardsRef[propertyId] = ref;
                      }}
                    />
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

          <div className='Properties__MapContainer'>
            <PropertiesMap
              className='mapboxgl-map'
              properties={searchProperties}
              location={location}
              propertySelected={propertySelected}
              propertyHovered={propertyHovered}
              setPropertySelected={setPropertySelected}
              setPropertyHovered={setPropertyHovered}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
