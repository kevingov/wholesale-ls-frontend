import { Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";

import { API } from "aws-amplify";
import { isProperty } from "@babel/types";

export default function userDashboard () {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAppContext();


    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            }

            try {
                const properties = await loadProperties();
                setProperties(properties);
            } catch (e) {
                onError(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [isAuthenticated]);

    function loadProperties() {
        return API.get("properties","/properties");
    }
    

    function renderPropertiesList(properties) {
        return [{}].concat(properties).map((properties, i) =>
            i !== 0 ? (
                <LinkContainer key={properties.propertiesId} to={'/notes/${properties.propertiesId}'}>
                    <ListGroupItem>
                        <h3>{isProperty.title}</h3>
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                <LinkContainer key="new" to="/properties/new">
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0b"}</b> Add a new Property
                        </h4>
                    </ListGroupItem>
                </LinkContainer>
            )
        );
    }

    function renderLander() {
        return (
            <div className="lander">
                <h1>User Dashboard</h1>
            </div>
        );
    }

    function renderProperties() {
        return (
            <div className="properties">
                <PageHeader>Your Properties</PageHeader>
                <ListGroup>
                    {!isLoading && renderPropertiesList(properties)}
                </ListGroup>
            </div>
        );
    }

    return (
        <div className="Home">
            {isAuthenticated ? renderProperties() : renderLander()}
        </div>
    );





}