// import "./ViewProperty.css";

import { Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import { API } from "aws-amplify";
import EditProperty from "./EditProperty";
import IosRefresh from "react-ionicons/lib/IosRefresh";
import MdCreate from "react-ionicons/lib/MdCreate";

export default function ViewProperty(props) {
  const [template, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    function loadProperty() {
      return API.get("properties", `/properties/${props.templateId}`);
    }

    async function onLoad() {
      try {
        const template = await loadProperty();

        setProperty(template);
        setIsLoading(true);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.templateId]);

  return (
    <div className="ViewProperty text-left">
      {isLoading ? (
        showEdit ? (
          <EditProperty
            setScreen={props.setScreen}
            templateId={props.templateId}
            props={props}
            closePropertyModel={props.closePropertyModel}
          />
        ) : (
          <Row>
            <Col sm={12}>
              <div>
                <span onClick={() => setShowEdit(true)} className="other-btn">
                  <MdCreate fontSize="14px" />
                  Edit
                </span>
                <span
                  onClick={() => props.closePropertyModel()}
                  className="other-btn pull-right"
                >
                  close
                </span>
                <br />
                <br />
                <p>
                  <b>{template.title} </b>
                </p>
                <p>{template.description}</p>
              </div>
              <hr />
              <br />
              <p>
                <b>Connection Request</b>
              </p>
              <p>{template.connectionRequestText}</p>
              {template.hasFirstFollowup ? (
                <p>
                  <br />
                  <small className="blue">
                    wait {template.firstFollowUpDays} days
                  </small>
                  <br />
                  <br />
                </p>
              ) : null}
              {template.hasFirstFollowup ? (
                <div>
                  <p>
                    <b>Followup</b>
                  </p>
                  <p>{template.firstFollowUpText}</p>
                </div>
              ) : null}
              {template.hasSecondFollowup ? (
                <p>
                  <br />
                  <small className="blue">
                    wait {template.secondFollowUpDays} days
                  </small>
                  <br />
                  <br />
                </p>
              ) : null}
              {template.hasSecondFollowup ? (
                <div>
                  <p>
                    <b>Second Followup</b>
                  </p>
                  <p>{template.secondFollowUpText}</p>
                </div>
              ) : null}
            </Col>
          </Row>
        )
      ) : (
        <IosRefresh fontSize="60px" color="#0085ef" rotate={true} />
      )}
    </div>
  );
}
