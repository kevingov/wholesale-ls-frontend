import { FormGroup, FormControl } from "react-bootstrap";
import Dropdown from "react-dropdown";
import React, { useEffect, useState, Fragment } from "react";
import { API } from "aws-amplify";

import Loading from "./Loading";
import "./Properties.css";
import PropertiesMap from "../components/PropertiesMap";
import PropertiesCard from "../components/PropertiesCard";

export default function Properties(props) {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
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
  }, [props.isAuthenticated]);

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

  let sortedProperties;
  if (filterSort === "Newest") {
    sortedProperties = resultsFilteredByDropdown.sort(
      (a, b) => b.createdAt - a.createdAt
    );
  } else if (filterSort === "Oldest") {
    sortedProperties = resultsFilteredByDropdown.sort(
      (a, b) => a.createdAt - b.createdAt
    );
  } else if (filterSort === "Price High-Low") {
    sortedProperties = resultsFilteredByDropdown.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  } else {
    sortedProperties = resultsFilteredByDropdown.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }

  // let searchProperties;
  // if (filterText === "") {
  //   searchProperties = sortedProperties
  // } else {
  //   searchProperties = sortedProperties.filter(results => {
  //     return results.title.toLowerCase().includes( filterText.toLowerCase() )
  //   })
  // }

  // const searchProperties = sortedProperties.filter((results) => {
  //   return results.title.toLowerCase().includes(filterText.toLowerCase());
  // });

  const searchProperties = sortedProperties;

  return (
    <div className='Index'>
      <div className='Properties__Filter'>
        <div className='Properties__Filter-Container container'>
          <FormGroup
            controlId='filterPropertyType'
            className='FilterContainer__Search-Bar'
          >
            <FormControl
              type='text'
              placeholder='Search'
              value={searchInput}
              onChange={(input) => setSearchInput(input.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId='filterPropertyType'>
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
                <h2>Properties in Toronto</h2>
                {searchProperties.map((property, index) => (
                  <PropertiesCard property={property} index={index} />
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
            <PropertiesMap properties={properties} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
