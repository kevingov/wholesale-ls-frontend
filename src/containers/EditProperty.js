// import "./EditProperty.css";

import { ControlLabel, FormControl, FormGroup } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import { API } from "aws-amplify";
import IosRefresh from "react-ionicons/lib/IosRefresh";
import LoaderButton from "../components/LoaderButton";
import MdTrash from "react-ionicons/lib/MdTrash";

export default function EditProperty(props) {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function loadProperty() {
      return API.get("properties", `/properties/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const property = await loadProperty();
        setTitle(property.title);
        setTagline(property.tagline);
        setIsLoading(false);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function deleteProperty() {
    return API.del("properties", `/properties/${props.match.params.id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) {
      return;
    }

    setIsLoading(true);

    try {
      await deleteProperty();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function validateForm() {
    return title.length > 0;
  }

  function saveProperty(property) {
    return API.put("properties", `/properties/${props.match.params.id}`, {
      body: property,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await saveProperty({ title });
      setIsLoading(false);
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  return (
    <div className="EditProperty">
      <p className="text-center">
        <span onClick={handleDelete} className="other-btn">
          <MdTrash fontSize="14px" />
          Delete Property
        </span>
      </p>

      {!isLoading ? (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>

          <FormGroup controlId="tagline">
            <ControlLabel>Tagline</ControlLabel>
            <FormControl
              value={tagline}
              type="text"
              onChange={(e) => setTagline(e.target.value)}
            />
          </FormGroup>

          <p className="text-right">
            <LoaderButton
              type="submit"
              className="other-btn"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              Update Property
            </LoaderButton>
          </p>
        </form>
      ) : (
        <IosRefresh fontSize="60px" color="#0085ef" rotate={true} />
      )}
    </div>
  );
}
