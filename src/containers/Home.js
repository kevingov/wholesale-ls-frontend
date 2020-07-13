import React from "react";
import "./Home.css";
import { Row, Col, Image, FormControl, FormGroup, Jumbotron } from 'react-bootstrap';
// import Image from 'react-bootstrap/Image'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
// import "../public/modena_home.jpg"

export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <div className="backgroundphoto" style={{backgroundImage: 'url(${https://wholesale-ls-marketing.s3.amazonaws.com/Modena+Home+House.jpg}'}}>
          
        </div>
          <Jumbotron>
            <div className="container">
              <h1>Find your Next Investment Property</h1>
              <p>Wholesale Properties for Flip, BRRRR, or Resale</p>

                <FormGroup>
                  <Row>
                    <Col xs={6}>
                      <FormControl placeholder="Location" />
                    </Col>
                    <Col xs={6}>
                      <FormControl placeholder="Max Price" />
                    </Col>
                  </Row>
                </FormGroup>
            </div>
          </Jumbotron>
      </div>

      <div className="highlight-container">
        <div className="container">
        <Row className="highlights">
          <Col xs="6" sm="4" className="text-center" >
            <h1>100</h1>
            <h3>Property Sold</h3>
            <p>Amount of Properties Sold Across Canada</p>
          </Col>
          <Col xs="6" sm="4" className="text-center" >
            <h1>37</h1>
            <h3>Active Listings</h3>
            <p>Amount of Current Real Estate Listings</p>
          </Col>
          <Col xs="6" sm="4" className="text-center" >
            <h1>40Mx in Savings</h1>
            <h3>Listings Saved</h3>
            <p>Amount Saved based off Wholesale LS Listings vs Comparables</p>
          </Col>
        </Row>
        </div>
      </div>


      <div className="cityCards">
        <h1>Search your Favourite Cities</h1>
          <Row>
            <Col xs="6" sm="4" className="text-center" >
              <Card className="text-center" as="a" onClick={"/properties"} style={{ cursor: "pointer"}}>
                <CardImg variant="top" src="https://wholesale-ls-marketing.s3.amazonaws.com/hamilton+skyline.jpg" />
                  <CardBody>
                    <CardTitle>Hamilton</CardTitle>
                        {/* <CardText tag="p">
                            Build Bots that will scrape Linkedin & Twitter to curate your own List of Leads
                        </CardText> */}
                      {/* <Button variant="primary">See Properties</Button> */}
                  </CardBody> 
              </Card>
            </Col>

            <Col xs="6" sm="4" className="text-center" > 
              <Card as="a" onClick={"/properties"} style={{ cursor: "pointer"}}>
                <CardImg variant="top" src="https://wholesale-ls-marketing.s3.amazonaws.com/toronto+skyline.jpg" />
                  <CardBody>
                    <CardTitle>Toronto</CardTitle>
                      {/* <CardText tag="p">
                        Automatically create a Drip Campagin of emails/messages designed to start Conversations.
                      </CardText> */}
                        {/* <Button variant="primary">See Properties</Button> */}
                  </CardBody>
              </Card>
            </Col>

            <Col xs="6" sm="4" className='text-center'>
              <Card as="a" onClick={"/properties"} style={{ cursor: "pointer"}}>
                <CardImg variant="top" src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+skyline.jpg" />
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

      <div className="featured-property">
        <h1>Featured Properties</h1>
            <Row>
              <Col>
                <Card as="a" onClick={"/properties"} style={{ cursor: "pointer"}}>
                  <CardImg variant="top" src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+skyline.jpg" />
                    <CardBody>
                      <CardTitle>Ottawa</CardTitle>
                        <CardText tag="p">
                          Export your Leads to your favorite CRM to analyze which campaigns are the most effective.
                        </CardText>
                          {/* <Button variant="primary">See Properties</Button> */}
                    </CardBody>
                </Card>  
              </Col>
              <Col>
                <Card as="a" onClick={"/properties"} style={{ cursor: "pointer"}}>
                  <CardImg variant="top" src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+skyline.jpg" />
                    <CardBody>
                      <CardTitle>Ottawa</CardTitle>
                        <CardText tag="p">
                          Export your Leads to your favorite CRM to analyze which campaigns are the most effective.
                        </CardText>
                          {/* <Button variant="primary">See Properties</Button> */}
                    </CardBody>
                </Card>
              </Col>   
            </Row>
      </div>


      <div className="about-us-container">
        <Row className="about-us-text">
          <Col xs={6} md={4}>
            <h1>About Us</h1>
            <h3>Welcome to the First Real Estate Marketplace for Off-Market Properties.

              We Work exclusively with Real Estate Wholesalers to find you undervalued property that are ready to flip in one convenience platform.

              Instead of scouring through MLS or your Real Estate Broker for deals, come browse our selection of private home owners in need of a quick sale. 
            </h3>
          </Col>
        </Row>

        <Row>

          <Col xs={6}>
            <Row>
              <Card as="a" onClick={"/properties"} style={{ cursor: "pointer"}}>
                  <CardImg variant="top" src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+skyline.jpg" />
                    <CardBody>
                      <CardTitle>Ottawa</CardTitle>
                        {/* <CardText tag="p">
                          Export your Leads to your favorite CRM to analyze which campaigns are the most effective.
                        </CardText> */}
                    </CardBody>
              </Card>
            </Row>
          </Col>


          <Col xs={6}>
              <Row>
                <Card as="a" onClick={"/properties"} style={{ cursor: "pointer"}}>
                    <CardImg variant="top" src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+skyline.jpg" />
                      <CardBody>
                        <CardTitle>Ottawa</CardTitle>
                          {/* <CardText tag="p">
                            Export your Leads to your favorite CRM to analyze which campaigns are the most effective.
                          </CardText> */}
                      </CardBody>
                </Card>     
              </Row>
              <Row>
              <Card as="a" onClick={"/properties"} style={{ cursor: "pointer"}}>
                    <CardImg variant="top" src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+skyline.jpg" />
                      <CardBody>
                        <CardTitle>Ottawa</CardTitle>
                          {/* <CardText tag="p">
                            Export your Leads to your favorite CRM to analyze which campaigns are the most effective.
                          </CardText> */}
                      </CardBody>
                </Card> 
              </Row>
          
          </Col>
        </Row>
      </div>

    </div>








  

   
   


  );
}