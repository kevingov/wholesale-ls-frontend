import { Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";



import { API } from "aws-amplify";


export default function UserDashboard () {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


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
    }, []);

    function loadProperties() {
        return API.get("properties","/userproperties");
    }
    

   

    function renderProperties() {
        return (
            <div className="Properties container">
                {!isLoading ? (
                    <Row>
                    {properties.map((property, i) => (
                        <Col key={i} xs={4}>
                        <a href={`/properties/${property.slug}`}>
                            <div className="property">
                            <h3>{property.title}</h3>
                            <p>{property.tagline}</p>
                            </div>
                        </a>
                        </Col>
                    ))}
                    </Row>
                ) : null}
                </div>
        );
    }

    return (
        <div className="Home">
            { renderProperties() }
        </div>
    );





}