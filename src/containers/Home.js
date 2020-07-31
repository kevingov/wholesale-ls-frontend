import "./Home.css";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,


} from "reactstrap";
import { Col, Row, FormControl, FormGroup, Image} from "react-bootstrap";

import React from "react";

export default function Home(props) {
  return (
    <div>
      {props.isAuthenticated ? (
        props.history.push("/properties")
      ) : (
        <div className="Home">
          <div className="clean-lander">
            <Row>
              <div className="col-md-4">
                <h1>
                  Real Estate Marketplace for Wholesale Properties
                </h1>
                <Button variant="success" href="/properties">
                  Search Properties
                </Button>
              </div>
              <div className="col-md-8">
              <Image src="https://wholesale-ls-marketing.s3.amazonaws.com/Hands-giving-keys.png" fluid></Image>
              </div>

            </Row>
          </div>



          {/* <div className="lander">
            <Jumbotron>
              <div className="container">
                <h1>Find your Next Investment Property</h1>
                <p>Wholesale Contracts for Flip, BRRRR, or Resale</p>
                <Button variant="success" href="/properties">
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
              {/* </div> */}
             {/* </Jumbotron> */}
           {/* </div>  */}

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
          {/* <div className="cities">
          <Row>
          
          <div className="cities-container">
            
              <div className="col-md-8">
                <div className="places_wrapper_type_2">
                  <div className="toronto-city">
                    <div className="places_type_2_tagline">
                      Toronto
                    </div>
                  </div>
              <div className="col-md-4">
                <div className="ottawa-city">
                </div>
              </div>
                  </div>
                </div>
         
          </div>
        
          </Row>
          </div>  */}


          <div className="cityCards">
            <h1>Featured Cities</h1>
            <h2>Search your Favourite Cities</h2>
            <p>Browse the best deals in the Hottest Markets</p>



             <div class="row">
                <div className="col-md-8 image-wrapper-big">
                <Image src="https://wholesale-ls-marketing.s3.amazonaws.com/toronto+skyline.jpg" fluid></Image>
                </div>
                
                <div className="col-md-4 image-wrapper-small">
                <Image src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+skyline.jpg" fluid></Image>

                </div>
              </div>
              <Row>
                <div className="col-md-4 image-wrapper-small">
                <Image src="https://wholesale-ls-marketing.s3.amazonaws.com/hamilton+skyline.jpg" fluid></Image>
                </div>
                <div className="col-md-4 image-wrapper-small">
                <Image src="https://wholesale-ls-marketing.s3.amazonaws.com/Windsor-Skyline.jpg" fluid></Image>
                </div>
                <div className="col-md-4 image-wrapper-small">
                <Image src="https://wholesale-ls-marketing.s3.amazonaws.com/Niagara+Falls-Skyline.jpg" fluid></Image>
                </div>
              </Row>


            <div className="grid-template">
             


            </div>




            {/* <div className="grid-template">
              <div className="col-6">
                <Card
                  className="browse-property"
                  as="a"
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  <CardImg
                    variant="top"
                    src="https://wholesale-ls-marketing.s3.amazonaws.com/Toronto-Nathan+Phillips+Night.jpg"
                  />
                  <CardBody>
                    <CardTitle>Toronto</CardTitle>
                    <CardText tag="p">
                      {/* Toronto */}
                    {/* </CardText>
                  </CardBody>
                </Card> */}
                {/* <img src="https://wholesale-ls-marketing.s3.amazonaws.com/Modena-Walls.jpg"
                alt="grid-photos">
                </img> */}
              {/* </div>
              <div className="col-6">
                <Row>
                  <Col xs={6}> */}
                    {/* <Card
                      as="a"
                      onClick={"/properties"}
                      style={{ cursor: "pointer" }}
                    >
                      <CardImg
                        variant="top"
                        src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa-Parliament.jpg"
                      />
                      <CardBody>
                        <CardTitle>Ottawa</CardTitle>
                    
                      {/* </CardBody>
                    </Card>  */}

                    {/* <Image src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa-Parliament.jpg" rounded></Image>
                  </Col> */}

                  {/* <Col xs={6}> */}
                    {/* <Card
                      as="a"
                      onClick={"/properties"}
                      style={{ cursor: "pointer" }}
                    >
                      <CardImg
                        variant="top"
                        src="https://wholesale-ls-marketing.s3.amazonaws.com/Hamilton-Skyline.jpg"
                      />
                      <CardBody>
                        <CardTitle>Hamilton</CardTitle>
                      </CardBody>
                    </Card> */}
                    {/* <Image src="https://wholesale-ls-marketing.s3.amazonaws.com/Hamilton-Skyline.jpg" fluid></Image>
                  </Col>
                </Row>
                <Row>
                  <div className="col-lg-12">
                    <Card
                      as="a"
                      onClick={"/properties"}
                      style={{ cursor: "pointer", margin: "10px 0 0" }}
                    >
                      <CardImg
                        variant="top"
                        src="https://wholesale-ls-marketing.s3.amazonaws.com/modena-houseviewing.jpg"
                      />
                      <CardBody>
                        <CardTitle>Windsor</CardTitle> */}
                        {/* <CardText tag="p">
                          When you're happy with the price and condition of the home, you can than finalize the contract and finish the assignment over to your name. Happy Investing! 
                        </CardText> */}
                      {/* </CardBody>
                    </Card>
                  </div>  
                </Row>
              </div>
          </div> */} 
            
          </div>

          <div className="about-us-container">
            <Row className="about-us-text">
              <Col xs={6}>
                <h1>First Marketplace for Off-Market Deals.</h1>
                <h3>
                  Reach a Wider Audence 
                </h3>
                
                <div class="title-underline"></div>

                <p>
                Instead of going to meetups or Facebook group to connect with wholesalers/buyers list, come to one centralized easy location to meet everyone. 
                </p>

                <p>
                  Think of this as one giant buyer's list, but on steroids!
                </p>
                <Button variant="success" href="/properties">
                  Search Properties
                </Button>
              </Col>
              <Col xs={6}>
                <img
                  alt="awesome proerty"
                  src="https://wholesale-ls-marketing.s3.amazonaws.com/Modena-keys2.jpeg"
                />
              </Col>
            </Row>

            <Row className="about-us-text">
              
              <Col xs={6}>
                <img
                  alt="awesome proerty"
                  src="https://wholesale-ls-marketing.s3.amazonaws.com/Modena-keys2.jpeg"
                />
              </Col>

              <Col xs={6}>
                <h1>First Marketplace for Off-Market Deals.</h1>
                <h3>
                  Build Relationships
                </h3>
                
                <div class="title-underline"></div>

                <p>
                  Connect and chat with other Real Estate Professionals. Whether it's building a connection with a Wholesale/Buyer, or looking for a Mortgage Broker to fund your next project. 
                </p>
                
                <p>
                  We aim to bring everyone together so foster more Joint Venture Opportunities. 
                </p>
                
                <Button variant="success" href="/properties">
                  Search Properties
                </Button>

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
            <Row>
              <Col xs="6" sm="3" className="text-center">
                <Card
                  className="text-center"
                  as="a"
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  {/* <CardImg
                    variant="top"
                    src="https://wholesale-ls-marketing.s3.amazonaws.com/hamilton+skyline.jpg"
                  /> */}
                  <CardBody>
                    <CardTitle>1) Find your Ideal Contract</CardTitle>
                    <CardText tag="p">
                                Browse through our curated selection of contracts for one that fits your budget and location.
                            </CardText>
                    {/* <Button variant="primary">See Properties</Button> */}
                  </CardBody>
                </Card>
              </Col>
              <Col xs="6" sm="3" className="text-center">
                <Card
                  as="a"
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  {/* <CardImg
                    variant="top"
                    src="https://wholesale-ls-marketing.s3.amazonaws.com/toronto+skyline.jpg"
                  /> */}
                  <CardBody>
                    <CardTitle>2) Message the Wholeseller</CardTitle>
                    <CardText tag="p">
                    Once you've found a contract that fits suits your goals, you can message the wholeseller directly for more information. 
                          </CardText> 
                    {/* <Button variant="primary">See Properties</Button> */}
                  </CardBody>
                </Card>
              </Col>
              <Col xs="6" sm="3" className="text-center">
                <Card
                  as="a"
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  {/* <CardImg
                    variant="top"
                    src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+skyline.jpg"
                  /> */}
                  <CardBody>
                    <CardTitle>3) Schedule a Showing</CardTitle>
                    <CardText tag="p">
                            After you've spoken with the Wholeseller and you're ready to view the property, you can schedule and book a time to view the property. 
                          </CardText>
                    {/* <Button variant="primary">See Properties</Button> */}
                  </CardBody>
                </Card>
              </Col>
              <Col xs="6" sm="3" className="text-center">
                <Card
                  as="a"
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  {/* <CardImg
                    variant="top"
                    src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+skyline.jpg"
                  /> */}
                  <CardBody>
                    <CardTitle>4) Purchase the Contract</CardTitle>
                    <CardText tag="p">
                    When you're happy with the price and condition of the home, you can than finalize the contract and finish the assignment over to your name. Happy Investing! 
                          </CardText>
                    {/* <Button variant="primary">See Properties</Button> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>

          </div>
          
          <div className="newsletter">
            <div className="green-bg"></div>
            <div className="narrow-box">
              <div className="newsletter-box">
              <h1>Subscribe to our Newsletter</h1>
              <h3>Receive the Best Property Deals</h3>
              <Row>
              
                  <FormGroup controlId="subscribe" bsSize="small">

                  
                <FormControl placeholder="Name"/>
                <FormControl type="email" placeholder="Email" />
              
                </FormGroup>
              
              </Row>
              </div>
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
                    src="https://wholesale-ls-marketing.s3.amazonaws.com/hamilton+skyline.jpg"
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
