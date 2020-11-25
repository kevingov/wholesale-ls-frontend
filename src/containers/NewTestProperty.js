import "./NewProperty.css";
import "react-dropdown/style.css";
import "react-datepicker/dist/react-datepicker.css";

import { API, Storage } from "aws-amplify";
import { Col, Row, Breadcrumb, ControlLabel, FormControl, FormGroup, } from "react-bootstrap";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Dropdown from "react-dropdown";
import Loading from "./Loading";
import MultiStepForm from "../components/MultiStepForm/MultiStepForm";

export default function NewProperty(props) {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [geoAddress, setGeoAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [offerDate, setOfferDate] = useState(new Date());
  const [closeDate, setCloseDate] = useState(new Date());
  const [groupShowingDate, setGroupShowingDate] = useState(new Date());
  const [bedroom, setBedroom] = useState(1);
  const [bathroom, setBathroom] = useState(1);
  const [parking, setParking] = useState(1);
  const [netOperatingIncome, setNetOperatingIncome] = useState(0);
  const [description, setDescription] = useState("");
  const [propertyNeeds, setPropertyNeeds] = useState("");
  const [whyThisProperty, setWhyThisProperty] = useState("");
  const [comparable, setComparable] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(false);
  const [price, setPrice] = useState("");
  const [nearbyPrice, setNearbyPrice] = useState("");
  const [arvPrice, setArvPrice] = useState("");

  function validateForm() {
    return title.length > 5;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const image = file ? await s3Upload(file) : null;
      console.log(image);
      const property = await createProperty({
        title,
        tagline,
        city,
        address,
        propertyType: propertyType.value,
        propertyStatus: propertyStatus.value,
        offerDate,
        closeDate,
        groupShowingDate,
        bedroom,
        bathroom,
        parking,
        netOperatingIncome,
        description,
        propertyNeeds,
        whyThisProperty,
        comparable,
        longitude,
        latitude,
        image,
        price,
        nearbyPrice,
        arvPrice,
      });
      props.history.push(`/properties/${property.propertyId}`);
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function createProperty(property) {
    return API.post("properties", "/properties", {
      body: property,
    });
  }

  function updatePropertyStatus(propertyStatus) {
    setPropertyStatus(propertyStatus);
  }

  function updatePropertyType(propertyType) {
    setPropertyType(propertyType);
  }

  async function handleSelect(val) {
    const results = await geocodeByAddress(val);
    const result = results[0];
    const latLng = await getLatLng(result);
    setCity(
      result.address_components.filter((component) =>
        component.types.includes("locality")
      )[0]["long_name"]
    );
    setAddress(result.formatted_address);
    setLongitude(latLng.lng);
    setLatitude(latLng.lat);
    setGeoAddress(result.formatted_address);
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function s3Upload(file) {
    const filename = `${Date.now()}-${file.name}`;

    try {
      const stored = await Storage.put(filename, file, {
        level: "public",
        contentType: file.type,
      });
      return stored.key;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="Index">
      <div className="Breadcrumbs">
        <div className="Breadcrumbs-items container">
            <Breadcrumb>
              <Breadcrumb.Item href="/properties">Properties</Breadcrumb.Item>
              <Breadcrumb.Item active>New Property</Breadcrumb.Item>
            </Breadcrumb>
        </div>
      </div>
        <div className="ViewProperty">
          <div className="container">
          <div className="ViewProperty-Wrapper">
          {!isLoading ? (
            <Row>
              <Col sm={7}>
                <div className="Back-Link">
                  <a href={`/properties`}>
                      Back to List
                  </a>
                </div>
              </Col>

              <MultiStepForm />
            </Row>
          ) : (
            <Loading />
          )}
            </div>
          </div>
        </div>
    </div>
  );
}
