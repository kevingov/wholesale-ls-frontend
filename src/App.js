import "./App.css";

import { Col, Row, Image } from "react-bootstrap";
import React, { Component } from "react";

import { API, Auth } from "aws-amplify";
import Routes from "./Routes";
import { withRouter } from "react-router-dom";
import config from "./config";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      profile: null,
    };
  }

  async componentDidMount() {
    console.log("Component mounting");
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
      const user = await Auth.currentUserInfo();
      let userId = "none";
      if (user) userId = user["id"];
      const userProfile = await this.loadProfile(userId);
      this.setState({ profile: userProfile });
      console.log("userProfile:", userProfile);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
      console.log(e);
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  };

  loadProfile = (userId) => {
    return API.get("profiles", `/profiles/${userId}`);
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
        <div className='App'>
          <div className='nav'>
            <div className='nav-content container'>
              <a href='/' className='logo hidden-xs'>
                <img
                  height='45'
                  alt='uncommon estate logo'
                  src='https://wholesale-ls-marketing.s3.amazonaws.com/logo/Looka/Color+logo+-+no+background.png'
                />
              </a>
              {this.state.isAuthenticated ? (
                <div className='links'>
                  <Col xs={3}>
                    <a href='/properties/new' className='secondary-btn'>
                      + New Property
                    </a>
                  </Col>
                  <Col xs={1}>
                    <a href='/profile' className='logo hidden-xs'>
                      <Image
                        height='30'
                        alt='Notification Icon'
                        src='https://wholesale-ls-marketing.s3.amazonaws.com/Icons/notification.svg'
                      />
                    </a>
                  </Col>
                  <Col xs={1}>
                    <a href='/profile' className='logo hidden-xs'>
                      <Image
                        height='45'
                        alt={`${this.state.profile.firstName} ${this.state.profile.lastName}'s profile logo`}
                        src={`https://${config.s3.BUCKET}.s3.amazonaws.com/public/${this.state.profile.image}`}
                        roundedcircle='true'
                      />
                    </a>
                  </Col>
                </div>
              ) : (
                <div className='links'>
                  <a
                    href='/login'
                    className={
                      window.location.pathname === "/login"
                        ? "active link-10"
                        : "link-10"
                    }
                  >
                    Log In
                  </a>
                  <div className='seperator ' />
                  <a href='/signup' className='secondary-btn '>
                    Signup
                  </a>
                </div>
              )}
            </div>
          </div>
          <Routes childProps={childProps} />
          <div className='footer'>
            <div className='footer-nav'>
              <div className=' container'>
                <Row>
                  <Col sm={12} md={6}>
                    <div>
                      <img
                        height='45'
                        alt='uncommon estate logo'
                        src='https://wholesale-ls-marketing.s3.amazonaws.com/logo/Looka/White+logo+-+no+background.png'
                      />
                    </div>
                    <br />
                    <br />
                  </Col>

                  <Col sm={12} md={2}>
                    <div className='sections-menu-headline'>Menu</div>
                    <a href='/' className='structure-menu-link'>
                      Home
                    </a>
                    <a href='/properties' className='structure-menu-link'>
                      Properties
                    </a>
                    <span
                      className='structure-menu-link'
                      onClick={() => this.handleLogout()}
                    >
                      Logout
                    </span>
                  </Col>

                  <Col sm={12} md={2}>
                    <div className='sections-menu-headline'>Legal</div>
                    <a href='/privacy' className='structure-menu-link'>
                      Privacy Policy
                    </a>
                    <a href='/terms' className='structure-menu-link'>
                      Terms
                    </a>
                  </Col>
                  <Col sm={12} md={2}>
                    <div className='sections-menu-headline'>Contact</div>
                    <a
                      href='https://linkedin.com/company/uncommonestate'
                      className='structure-menu-link'
                    >
                      LinkedIn
                    </a>
                    <a
                      href='https://twitter.com/uncommonestate'
                      className='structure-menu-link'
                    >
                      Twitter
                    </a>
                    <a
                      href='https://instagram.com/uncommonestate'
                      className='structure-menu-link'
                    >
                      Instagram
                    </a>
                    <a
                      href='https://facebook.com/uncommonestate'
                      className='structure-menu-link'
                    >
                      Facebook
                    </a>
                    <a
                      href='https://uncommonestate.slack.com'
                      className='structure-menu-link'
                    >
                      Slack
                    </a>
                  </Col>
                </Row>
              </div>
            </div>
            <div className='copy'>
              <div className='copy-inner'>
                <span className='fadedspan'>
                  © 2020 Uncommonestate, Inc. All rights reserved.
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
