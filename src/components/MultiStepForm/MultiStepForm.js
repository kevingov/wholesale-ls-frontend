import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import BasicInfo from "./BasicInfo";
import PropertyDetail from "./PropertyDetail";
import Comparables from "./Comparables";
import Price from "./Price";



const steps = [
  { id: "basicInfo" },
  { id: "propertyDetail" },
  { id: "comparables" },
//   { id: "images" },
  { id: "price" }
];

const defaultData = {
  title: "",
  tagline: "",
  address: "",
  propertyType: "",
  propertyStatus: "",
  bedrooms: "",
  bathrooms: "",
  parking: "",
  description: "",
  whyThisProperty: "",
  propertyNeeds: "",
  comparableProperties: "",
  offerDate: "",
  closeDate: "",
  groupShowingDate: "",
  price: "",
  nearbyPrice: "",
  arvPrice: "",

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
    case "price":
      return <Price {...props} />;
    default:
      return null;
  }
};

export default MultiStepForm;