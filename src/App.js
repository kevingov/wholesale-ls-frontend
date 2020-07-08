import "./App.css";

import React, { Component } from "react";

import { Auth } from "aws-amplify";
import Routes from "./Routes";
import { withRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = async (event) => {
    await Auth.signOut();

    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      handleLogout: this.handleLogout,
    };

    return (
      !this.state.isAuthenticating && (
        <div className="App">
          <div className="nav">
            <div className="nav-content container">
              <a href="/" className="logo hidden-xs">
                Modena
              </a>
              {this.state.isAuthenticated ? (
                <div className="links">
                  <a href="/properties/new" className="secondary-btn">
                    New Property
                  </a>
                </div>
              ) : (
                <div className="links">
                  <a
                    href="/login"
                    className={
                      window.location.pathname === "/login"
                        ? "active link-10"
                        : "link-10"
                    }
                  >
                    Log In
                  </a>
                  <div className="seperator " />
                  <a href="/signup" className="secondary-btn ">
                    Signup
                  </a>
                </div>
              )}
            </div>
          </div>
          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

export default withRouter(App);
