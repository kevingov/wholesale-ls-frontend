import "./Loading.css";

import React, { Component } from "react";

import ReactLoading from "react-loading";

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <ReactLoading
          className="loading"
          type={"bubbles"}
          color={"#6C63FF"}
          height={"100px"}
          width={"150px"}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
