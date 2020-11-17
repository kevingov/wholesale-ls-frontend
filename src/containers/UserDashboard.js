import { Row, Col, Breadcrumb } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import config from "../config";
import mapPinIcon from "../assets/map-pin-icon.png";
import "./SearchProperties.css";


import { API } from "aws-amplify";


export default function UserDashboard () {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function onLoad() {
            try {
                const properties = await loadProperties();
                setProperties(properties);
                console.log(properties);
            } catch (e) {
                alert(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, []);

    function loadProperties() {
        return API.get("properties","/userproperties");
    }
    
    

   

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
                
                 <div className='SearchProperties'>
                    <div className='SearchProperties__Results'>
                        <p className='SearchProperties__Results-Found'>
                        {Object.keys(properties).length} Properties found
                        </p>
                        <h1>Properties in Markham</h1>
                {properties 
                    .map((property, i) => (
                    <Col key={i} sm={4}>
                    <div key={("Property", i)} className='SearchPropertiesCard'>
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
                    <br />
                    <br />
            </Col>
            ))}
                </div>
                </div>
            ) : (
                <Loading />
            )}
            </div>
            </div>
        );
}