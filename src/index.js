import "./index.css";

import * as serviceWorker from "./serviceWorker";

import { Amplify } from "aws-amplify";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import config from "./config";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import reducer from "./store/reducers";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "properties",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
      {
        name: "profiles",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

// const store = createStore(reducer);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
