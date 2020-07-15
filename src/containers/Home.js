import "./Home.css";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";
import { Col, Jumbotron, Row } from "react-bootstrap";

import React from "react";

export default function Home(props) {
  return (
    <div>
      {props.isAuthenticated ? (
        props.history.push("/properties")
      ) : (
        <div className="Home">
          <div className="lander">
            <Jumbotron>
              <div className="container">
                <h1>Find your Next Investment Property</h1>
                <p>Wholesale Contracts for Flip, BRRRR, or Resale</p>
                <Button variant="success" href="#">
                  Search Properties
                </Button>
                {/* <FormGroup>
                      <Row>
                        <Col xs={6}>
                          <FormControl placeholder="Location" />
                        </Col>
                        <Col xs={6}>
                          <FormControl placeholder="Max Price" />
                        </Col>
                      </Row>
                    </FormGroup> */}
              </div>
            </Jumbotron>
          </div>

          <div className="highlight-container">
            <div className="container">
              <Row className="highlights">
                <Col xs="6" sm="4" className="text-center">
                  <h1>100</h1>
                  <h3>Property Sold</h3>
                  <p>Amount of Properties Sold Across Canada</p>
                </Col>
                <Col xs="6" sm="4" className="text-center">
                  <h1>37</h1>
                  <h3>Active Listings</h3>
                  <p>Amount of Current Real Estate Listings</p>
                </Col>
                <Col xs="6" sm="4" className="text-center">
                  <h1>40Mx in Savings</h1>
                  <h3>Listings Saved</h3>
                  <p>
                    Amount Saved based off Wholesale LS Listings vs Comparables
                  </p>
                </Col>
              </Row>
            </div>
          </div>

          <div className="cityCards">
            <h1>Featured Cities</h1>
            <h2>Search your Favourite Cities</h2>
            <p>Browse the best deals in the Hottest Markets</p>
            <Row>
              <Col xs="6" sm="4" className="text-center">
                <Card
                  className="text-center"
                  as="a"
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  <CardImg
                    variant="top"
                    src="https://wholesale-ls-marketing.s3.amazonaws.com/hamilton+skyline.jpg"
                  />
                  <CardBody>
                    <CardTitle>Hamilton</CardTitle>
                    {/* <CardText tag="p">
                                Build Bots that will scrape Linkedin & Twitter to curate your own List of Leads
                            </CardText> */}
                    {/* <Button variant="primary">See Properties</Button> */}
                  </CardBody>
                </Card>
              </Col>

              <Col xs="6" sm="4" className="text-center">
                <Card
                  as="a"
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  <CardImg
                    variant="top"
                    src="https://wholesale-ls-marketing.s3.amazonaws.com/toronto+skyline.jpg"
                  />
                  <CardBody>
                    <CardTitle>Toronto</CardTitle>
                    {/* <CardText tag="p">
                            Automatically create a Drip Campagin of emails/messages designed to start Conversations.
                          </CardText> */}
                    {/* <Button variant="primary">See Properties</Button> */}
                  </CardBody>
                </Card>
              </Col>

              <Col xs="6" sm="4" className="text-center">
                <Card
                  as="a"
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  <CardImg
                    variant="top"
                    src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+skyline.jpg"
                  />
                  <CardBody>
                    <CardTitle>Ottawa</CardTitle>
                    {/* <CardText tag="p">
                            Export your Leads to your favorite CRM to analyze which campaigns are the most effective.
                          </CardText> */}
                    {/* <Button variant="primary">See Properties</Button> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>

          <div className="about-us-container">
            <Row className="about-us-text">
              <Col xs={6}>
                <h1>About Us</h1>
                <h3>
                  Welcome to the First Real Estate Marketplace for Off-Market
                  Properties.{" "}
                </h3>

                <h3>
                  We Work exclusively with Real Estate Wholesalers to find you
                  undervalued property that are ready to flip in one convenience
                  platform.{" "}
                </h3>

                <h3>
                  Instead of scouring through MLS or your Real Estate Broker for
                  deals, come browse our selection of private home owners in
                  need of a quick sale.
                </h3>
                <div class="title-underline"></div>
              </Col>
              <Col xs={6}>
                <img
                  alt="awesome proerty"
                  src="https://wholesale-ls-marketing.s3.amazonaws.com/Modena-keys2.jpeg"
                />
              </Col>
            </Row>
          </div>

          <div className="how-it-works">
            <Row>
              <Col xs={6}>
                <h1>How it works</h1>
                <h3>We'll help streamline the entire transaction.</h3>
              </Col>
            </Row>
          </div>
          <div className="grid-template">
            <Row>
              <Col xs={6}>
                <Card
                  className="browse-property"
                  as="a"
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  <CardImg
                    variant="top"
                    src="https://wholesale-ls-marketing.s3.amazonaws.com/Modena-browse+property.jpg"
                  />
                  <CardBody>
                    <CardTitle>Find your Ideal Contract</CardTitle>
                    <CardText tag="p">
                      Search through our entire listing of property contracts to
                      find one that suits your criterias.
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col xs={6}>
                <Row>
                  <Col xs={6}>
                    <Card
                      as="a"
                      onClick={"/properties"}
                      style={{ cursor: "pointer" }}
                    >
                      <CardImg
                        variant="top"
                        src="https://wholesale-ls-marketing.s3.amazonaws.com/Modena-Message.jpg"
                      />
                      <CardBody>
                        <CardTitle>Message the Seller</CardTitle>
                        <CardText tag="p">
                          Inquiry directly with the wholeseller regarding the
                          contract.
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col xs={6}>
                    <Card
                      as="a"
                      onClick={"/properties"}
                      style={{ cursor: "pointer" }}
                    >
                      <CardImg
                        variant="top"
                        src="https://wholesale-ls-marketing.s3.amazonaws.com/modena-houseviewing.jpg"
                      />
                      <CardBody>
                        <CardTitle>Schedule a Showing</CardTitle>
                        <CardText tag="p">
                          Coordinate a time to view the property in person prior
                          to purchase.
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Card
                    as="a"
                    onClick={"/properties"}
                    style={{ cursor: "pointer" }}
                  >
                    <CardImg
                      variant="top"
                      src="https://wholesale-ls-marketing.s3.amazonaws.com/Modena-Transaction.jpg"
                    />
                    <CardBody>
                      <CardTitle>Purchase the Contract</CardTitle>
                      <CardText tag="p">
                        Finalize the details and purchase the contract from the
                        wholeseller.
                      </CardText>
                    </CardBody>
                  </Card>
                </Row>
              </Col>
            </Row>
          </div>

          <div className="newsletter">
            <div className="green-bg"></div>
            <div className="newsletter-box">
              <h1>Subscribe to our Newsletter</h1>
            </div>

            <div className="image-bg"></div>
          </div>

          <div className="featured-property">
            <h1>Featured Properties</h1>
            <Row>
              <Col md={3}>
                <Card
                  as="a"
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  <CardImg
                    variant="top"
                    src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+skyline.jpg"
                  />
                  <CardBody>
                    <CardTitle>Ottawa</CardTitle>
                    <CardText tag="p">
                      Export your Leads to your favorite CRM to analyze which
                      campaigns are the most effective.
                    </CardText>
                    {/* <Button variant="primary">See Properties</Button> */}
                  </CardBody>
                </Card>
              </Col>
              <Col md={3}>
                <Card
                  as="a"
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  <CardImg
                    variant="top"
                    src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+skyline.jpg"
                  />
                  <CardBody>
                    <CardTitle>Ottawa</CardTitle>
                    <CardText tag="p">
                      Export your Leads to your favorite CRM to analyze which
                      campaigns are the most effective.
                    </CardText>
                    {/* <Button variant="primary">See Properties</Button> */}
                  </CardBody>
                </Card>
              </Col>
              <Col md={3}>
                <Card
                  as="a"
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  <CardImg
                    variant="top"
                    src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+skyline.jpg"
                  />
                  <CardBody>
                    <CardTitle>Ottawa</CardTitle>
                    <CardText tag="p">
                      Export your Leads to your favorite CRM to analyze which
                      campaigns are the most effective.
                    </CardText>
                    {/* <Button variant="primary">See Properties</Button> */}
                  </CardBody>
                </Card>
              </Col>
              <Col md={3}>
                <Card
                  as="a"
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  <CardImg
                    variant="top"
                    src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+skyline.jpg"
                  />
                  <CardBody>
                    <CardTitle>Ottawa</CardTitle>
                    <CardText tag="p">
                      Export your Leads to your favorite CRM to analyze which
                      campaigns are the most effective.
                    </CardText>
                    {/* <Button variant="primary">See Properties</Button> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}
