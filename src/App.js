import "./App.css";

import { Col, Row } from "react-bootstrap";
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
                  <button onClick={() => this.handleLogout()}>Logout</button>
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
          <div className="footer">
            <div className="footer-nav">
              <div className=" container">
                <Row>
                  <Col sm={12} md={6}>
                    <div>
                      <img
                        height="45"
                        alt="conversify logo"
                        src="https://conversify-marketing.s3.amazonaws.com/uconnectly-lgoo.png"
                      />
                    </div>
                    <br />
                    <br />
                  </Col>

                  <Col sm={12} md={2}>
                    <div className="sections-menu-headline">Menu</div>
                    <a href="/" className="structure-menu-link">
                      Home
                    </a>
                    <a
                      href="https://www.facebook.com/groups/conversify/"
                      className="structure-menu-link"
                    >
                      Community
                    </a>
                  </Col>

                  <Col sm={12} md={2}>
                    <div className="sections-menu-headline">Legal</div>
                    <a href="/privacy" className="structure-menu-link">
                      Privacy Policy
                    </a>
                    <a href="/terms" className="structure-menu-link">
                      Terms
                    </a>
                  </Col>
                  <Col sm={12} md={2}>
                    <div className="sections-menu-headline">Contact</div>
                    <a
                      href="https://linkedin.com/company/uconnectly"
                      className="structure-menu-link"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://twitter.com/uconnectly"
                      className="structure-menu-link"
                    >
                      Twitter
                    </a>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="copy">
              <div className="copy-inner">
                <span className="fadedspan">
                  © 2019 Uncommonestate, Inc. All rights reserved.
                </span>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default withRouter(App);
