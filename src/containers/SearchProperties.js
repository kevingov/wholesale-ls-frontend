import { FormGroup, FormControl } from "react-bootstrap";
import Dropdown from "react-dropdown";
import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";

import Loading from "./Loading";
import config from "../config";
import "./SearchProperties.css";
import mapPinIcon from "../assets/map-pin-icon.png";
import SearchPropertiesMap from "../components/SearchPropertiesMap";

export default function Properties(props) {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterPropertyType, setFilterPropertyType] = useState("");
  const [filterBedrooms, setFilterBedrooms] = useState(0);
  const [filterBathrooms, setFilterBathrooms] = useState(0);
  const [filterSort, setFilterSort] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    async function onLoad() {
      try {
        const properties = await loadProperties();
        setProperties(properties);
        setFilterBedrooms(0);
        setFilterBathrooms(0);
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
    setFilterPropertyType(event.value);
  };

  const updateFilterBedrooms = (event) => {
    setFilterBedrooms(event.value);
  };

  const updateFilterBathrooms = (event) => {
    setFilterBathrooms(event.value);
  };

  const updateFilterSort = (event) => {
    setFilterSort(event.value);
  };

  const resultsFilteredByDropdown = properties.filter((results) => {
    console.log(filterPropertyType);
    if (filterPropertyType === "") {
      return results;
    } else {
      return (
        results.propertyType === filterPropertyType &&
        results.bedroom > filterBedrooms &&
        results.bathroom > filterBathrooms
      );
    }
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

  const searchProperties = sortedProperties.filter((results) => {
    return results.title.toLowerCase().includes(filterText.toLowerCase());
  });
  console.log(searchProperties);
  return (
    <div className='Index'>
      <div className='SearchProperties__Filter'>
        <div className='SearchProperties__Filter-Container container'>
          <FormGroup
            controlId='filterPropertyType'
            className='FilterContainer__Search-Bar'
          >
            <FormControl
              type='text'
              placeholder='Search'
              onChange={(e) => setFilterText(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId='filterPropertyType'>
            <Dropdown
              placeholder='Property Types'
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
          </FormGroup>
          <FormGroup controlId='filterBedrooms'>
            <Dropdown
              placeholder='Bedrooms'
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
          </FormGroup>
          <FormGroup controlId='filterBathrooms'>
            <Dropdown
              placeholder='Bathrooms'
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
          </FormGroup>
          <FormGroup controlId='filterSort'>
            <Dropdown
              placeholder='Sort By'
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
          </FormGroup>
        </div>
      </div>
      {!isLoading ? (
        <div className='SearchProperties'>
          <div className='SearchProperties__Results'>
            <p className='SearchProperties__Results-Found'>
              {searchProperties.length} Properties found
            </p>
            <h1>Properties in Markham</h1>
            {searchProperties.map((property, index) => (
              <div key={("Property", index)} className='SearchPropertiesCard'>
                <a
                  href={`/properties/${property.propertyId}`}
                  className='SearchPropertiesCard__Image-Container'
                >
                  <img
                    alt={`${property.address} - Focus Property`}
                    src={`https://${config.s3.BUCKET}.s3.amazonaws.com/public/${property.image}`}
                  />
                </a>
                <div className='SearchPropertiesCard__Details'>
                  <h3 className='SearchPropertiesCard__Title'>
                    {property.title.length > 45
                      ? property.title.slice(0, 45) + " ..."
                      : property.title}
                  </h3>
                  <div className='SearchPropertiesCard__Address'>
                    <img src={mapPinIcon} alt='Map Pin Icon' />
                    {/* <p>{property.address}</p> */}
                    <p className='lightText'>1025 Sesame Street, Aurora ON</p>
                  </div>
                  <div className='SearchProperties__Row-Highlights'>
                    {property.bedroom && <div>{property.bedroom} Bedrooms</div>}
                    {property.bathroom && (
                      <div>{property.bathroom} Bathrooms</div>
                    )}
                    {property.propertType && <div>{property.propertyType}</div>}
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
            ))}
          </div>
          <div className='SearchProperties__MapContainer'>
            <SearchPropertiesMap properties={properties} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
