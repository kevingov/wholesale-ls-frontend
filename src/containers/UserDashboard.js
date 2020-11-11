import { Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import config from "../config";


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
    

   

        return (
            <div className="Index">
                <div className="Breadcrumbs">
                    <div className="Breadcrumbs-items container">
                        <Breadcrumb>
                            <Breadcrumb.Item active>Properties</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
            <div className="Properties container">
            {!isLoading ? (
                <Row>
                {properties
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .map((property, i) => (
                    <Col key={i} sm={4}>
                        <a href={`/properties/${property.propertyId}`}>
                        <div className="property">
                            <div
                            style={{
                                backgroundImage: `url(https://${config.s3.BUCKET}.s3.amazonaws.com/public/${property.image})`,
                                backgroundSize: "cover",
                                height: "200px",
                                borderRadius: "5px",
                                marginBottom: "5px",
                            }}
                            className="propertyImage"
                            ></div>
                            <p>
                            <b>
                                {property.propertyType} &middot; {property.city}
                            </b>
                            </p>
                            <p>
                            {property.title.length > 45
                                ? property.title.slice(0, 45) + " ..."
                                : property.title}
                            </p>
                        </div>
                        </a>
                        <br />
                        <br />
                    </Col>
                    ))}
                </Row>
            ) : (
                <Loading />
            )}
            </div>
            </div>
        );
}