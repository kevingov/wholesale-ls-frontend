// import "./Properties.css";

import { Col, Modal, Row, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import { API } from "aws-amplify";
// import IosChatboxes from "react-ionicons/lib/IosChatboxes";
import IosRefresh from "react-ionicons/lib/IosRefresh";
import MdAdd from "react-ionicons/lib/MdAdd";
import NewProperty from "./NewProperty";
import ViewProperty from "./ViewProperty";

export default function Properties(props) {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewPropertyModel, setViewPropertyModel] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [viewNewPropertyModel, setViewNewPropertyModel] = useState(false);
  const [viewPropertyTutorial, setViewPropertyTutorial] = useState(false);

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
    return API.get("properties", "/properties");
  }

  function closePropertyModel() {
    setViewPropertyModel(false);
  }

  function showProperty(propertyId) {
    setPropertyId(propertyId);
    setViewPropertyModel(true);
  }

  return (
    <div className="Properties">
      {!isLoading ? (
        properties.length === 0 ? (
          <div className="text-center">
            <br />
            <br />
            <br />
            <br />
            <p className="text-center">
              <IosChatboxes fontSize="64px" color="#8792a2" />
            </p>
            <p>Create your first property</p>
            <p className="text-center">
              <button
                onClick={() => setViewNewPropertyModel(true)}
                className="btn-secondary"
              >
                Create Property
              </button>
            </p>
          </div>
        ) : (
          <Row>
            <Col sm={12}>
              <div className="titlePanel">
                <span
                  className="other-btn"
                  onClick={() => setViewNewPropertyModel(true)}
                >
                  <MdAdd fontSize="16px" />
                  Add Property
                </span>
              </div>
            </Col>
            <Col sm={12}>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contacts</th>
                    <th>Requests</th>
                    <th>Connections</th>
                    <th>Replies</th>
                    <th>Positive Replies</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property, i) => (
                    <tr key={property.propertyId}>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => showProperty(property.propertyId)}
                      >
                        {property.title}
                      </td>
                      <td>{property.contacts}</td>
                      <td>
                        {property.requests}{" "}
                        {property.contacts > 0 && property.requests > 0 ? (
                          <small className="blue">
                            {(
                              (property.requests / property.contacts) *
                              100
                            ).toFixed(0)}
                            %
                          </small>
                        ) : null}{" "}
                      </td>
                      <td>
                        {property.connections}{" "}
                        {property.contacts > 0 && property.connections > 0 ? (
                          <small className="blue">
                            {(
                              (property.connections / property.contacts) *
                              100
                            ).toFixed(0)}
                            %
                          </small>
                        ) : null}{" "}
                      </td>
                      <td>
                        {property.conversations}{" "}
                        {property.contacts > 0 && property.conversations > 0 ? (
                          <small className="blue">
                            {(
                              (property.conversations / property.contacts) *
                              100
                            ).toFixed(0)}
                            %
                          </small>
                        ) : null}{" "}
                      </td>
                      <td>
                        {property.positives}{" "}
                        {property.contacts > 0 && property.positives > 0 ? (
                          <small className="blue">
                            {(
                              (property.positives / property.contacts) *
                              100
                            ).toFixed(0)}
                            %
                          </small>
                        ) : null}{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        )
      ) : (
        <div className="container text-center">
          <br />
          <br />
          <br />
          <br />
          <IosRefresh fontSize="60px" color="#0085ef" rotate={true} />
        </div>
      )}
      <Modal show={viewNewPropertyModel} dialogClassName="modal-90w">
        <Modal.Body>
          {viewPropertyTutorial ? (
            <div className="modal-card text-center">
              <Row>
                <Col xs={12}>
                  <div className="NewProperty" style={{ paddingTop: "0px" }}>
                    <button
                      onClick={() => setViewNewPropertyModel(false)}
                      className="other-btn pull-right"
                    >
                      close
                    </button>

                    <button
                      onClick={() => setViewPropertyTutorial(false)}
                      className="other-btn pull-left"
                    >
                      back
                    </button>
                  </div>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={12}>
                  <video controls>
                    {" "}
                    <source
                      src="https://conversify-marketing.s3.amazonaws.com/properties.mp4"
                      type="video/mp4"
                    />{" "}
                  </video>
                </Col>
              </Row>
            </div>
          ) : (
            <div className="modal-card text-center">
              <Row>
                <Col xs={12}>
                  <div className="NewProperty" style={{ paddingTop: "0px" }}>
                    <button
                      onClick={() => setViewNewPropertyModel(false)}
                      className="other-btn pull-right"
                    >
                      close
                    </button>

                    <button
                      onClick={() => setViewPropertyTutorial(true)}
                      className="other-btn pull-left"
                    >
                      ?
                    </button>
                  </div>
                </Col>
              </Row>
              <NewProperty setScreen={props.setScreen} props={props} />
            </div>
          )}
        </Modal.Body>
      </Modal>
      <Modal show={viewPropertyModel} dialogClassName="modal-90w">
        <Modal.Body>
          <div className="modal-card text-center">
            <ViewProperty
              setScreen={props.setScreen}
              propertyId={propertyId}
              props={props}
              closePropertyModel={closePropertyModel}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
