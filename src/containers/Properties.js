import { FormGroup, FormControl } from "react-bootstrap";
import Dropdown from "react-dropdown";
import React, { useEffect, useState, useRef, Fragment } from "react";
import { API } from "aws-amplify";

import Loading from "./Loading";
import "./Properties.css";
import PropertiesMap from "../components/PropertiesMap";
import PropertiesCard from "../components/PropertiesCard";

export default function Properties(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [location, setLocation] = useState("Toronto");
  const [propertySelected, setPropertySelected] = useState(null);
  const geocoderRef = useRef(null);

  const [filterPropertyType, setFilterPropertyType] = useState({
    value: "All",
  });
  const [filterBedrooms, setFilterBedrooms] = useState({ value: 0 });
  const [filterBathrooms, setFilterBathrooms] = useState({ value: 0 });
  const [filterSort, setFilterSort] = useState({ value: "" });

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

  function loadProperties() {
    return API.get("properties", "/properties", {
      queryStringParameters: {
        filterBedrooms: filterBedrooms,
        filterBathrooms: filterBathrooms,
      },
    });
  }

  const updateFilterPropertyType = (event) => {
    setFilterPropertyType(event);
  };

  const updateFilterBedrooms = (event) => {
    setFilterBedrooms(event);
  };

  const updateFilterBathrooms = (event) => {
    setFilterBathrooms(event);
  };

  const updateFilterSort = (event) => {
    setFilterSort(event);
  };

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
  // const onSelectDropdownLocation = (event) => {
  //   const location = event.currentTarget.getAttribute("data-location");
  //   setLocation(location);
  // };

  return (
    <div className='Index'>
      <div className='Properties__Filter'>
        <div className='Properties__Filter-Container container'>
          <FormGroup
            controlId='filterPropertyType'
            className='Locations-Search-Bar'
          >
            <div
              ref={geocoderRef}
              className='Locations-Search-Bar__Wrapper'
              style={{
                height: 50,
                display: "flex",
                alignItems: "center",
                paddingLeft: 4,
              }}
            ></div>
          </FormGroup>
          <FormGroup controlId='filterPropertyType'>
            <p className='Property__Filter-Label'>Property Type</p>
            <Dropdown
              placeholder='Property Types'
              value={filterPropertyType.label}
              options={[
                {
                  label: "All",
                  value: "All",
                },
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
          </FormGroup>
          <FormGroup controlId='filterBedrooms'>
            <p className='Property__Filter-Label'>Bedrooms</p>
            <Dropdown
              placeholder='Bedrooms'
              value={filterBedrooms.label}
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
          </FormGroup>
          <FormGroup controlId='filterBathrooms'>
            <p className='Property__Filter-Label'>Bathrooms</p>
            <Dropdown
              placeholder='Bathrooms'
              value={filterBathrooms.label}
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
          </FormGroup>
          <FormGroup controlId='filterSort'>
            <p className='Property__Filter-Label'>Sort By</p>
            <Dropdown
              placeholder='Sort By'
              value={filterSort.label}
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
                <h2>Properties in {location}</h2>
                {searchProperties.map((property, index) => (
                  <PropertiesCard
                    key={("Property", index)}
                    property={property}
                  />
                ))}
              </Fragment>
            ) : (
              <Fragment>
                <h2>No Properties Found</h2>
                <p>Search again or adjust filter options</p>
              </Fragment>
            )}
          </div>

          <div className='Properties__MapContainer'>
            <PropertiesMap
              className='mapboxgl-map'
              geocoderRef={geocoderRef}
              properties={properties}
              location={location}
              setLocation={setLocation}
              propertySelected={propertySelected}
              setPropertySelected={setPropertySelected}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
