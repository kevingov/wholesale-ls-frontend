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
      <div style={{ height: "100vh" }}>
        <ReactLoading
          className='loader'
          type={"spinningBubbles"}
          color={"#1bbb5b"}
          height={"70px"}
          width={"70px"}
        />
      </div>
    );
  }
}
