import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import BasicInfo from "./BasicInfo";
import PropertyDetail from "./PropertyDetail";
import Comparables from "./Comparables";



const steps = [
  { id: "basicInfo" },
  { id: "propertyDetail" },
  { id: "comparables" },
//   { id: "images" },
//   { id: "price" }
];

const defaultData = {
  title: "Please Type Title",
  tagline: "Enter the description",
  address: "Address",
  propertyType: "Select",
  propertyStatus: "Select",
  bedrooms: "3",
  bathrooms: "1",
  parking: "1",
  description: "Enter the description",
  whyThisProperty: "Enter the description",
  propertyNeeds: "Enter the description",
  comparableProperties: "Enter the description",
  offerDate: "September 2, 2020",
  closeDate: "September 2, 2020",
  groupShowingDate: "September 2, 2020",
  price: "$450,000",
  nearbyPrice: "$550,000",
  arvPrice: "$700,000",

};

const MultiStepForm = ({ images }) => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const props = { formData, setForm, navigation };

  switch (id) {
    case "basicInfo":
      return <BasicInfo {...props} />;
    case "propertyDetail":
      return <PropertyDetail {...props} />;
    case "comparables":
      return <Comparables {...props} />;
    // case "images":
    //   return <Images {...props} />;
    // case "price":
    //   return <Price {...props} />;
    default:
      return null;
  }
};

export default MultiStepForm;