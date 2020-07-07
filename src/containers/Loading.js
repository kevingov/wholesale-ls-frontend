import React, { Component } from "react";
import ReactLoading from 'react-loading';
import "./Loading.css";

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,  
    };
  }

  render() {
    return <ReactLoading className="loading" type={'bubbles'} color={'#6C63FF'} height={'200px'} width={'200px'} />;
  }
}
