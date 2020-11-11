import "./Home.css";

import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { Col, Row, FormControl, FormGroup, Image } from "react-bootstrap";

import React from "react";

export default function Home(props) {
  return (
    <div>
      {props.isAuthenticated ? (
        props.history.push("/properties")
      ) : (
        <div className='Home'>
          <div className='lander'>
            <Row>
              <div className='col-md-4'>
                <h1>Real Estate Marketplace for Wholesale Properties</h1>
                <Button variant='success' href='/searchproperties'>
                  Search Properties
                </Button>
              </div>
              <div className='col-md-8'>
                <Image
                  alt='awesome proerty'
                  class='center'
                  src='https://wholesale-ls-marketing.s3.amazonaws.com/undraw_select_house_qbag.svg'
                  fluid
                />
              </div>
            </Row>
          </div>

          <div className='highlight-container'>
            <div className='container'>
              <Row className='highlights text-center'>
                <h1>Who's on Uncommon Estate?</h1>
                <Col xs='6' sm='4' className='text-center'>
                  <h1>Dream Investment Realty</h1>
                </Col>
                <Col xs='6' sm='4' className='text-center'>
                  <h1>Cash Flowing Realty</h1>
                </Col>
                <Col xs='6' sm='4' className='text-center'>
                  <h1>Fire Homes Realty</h1>
                </Col>
              </Row>
            </div>
          </div>

          <div className='cityCards'>
            <h4>Search Your Favourite Cities</h4>

            <Row>
              <div className='col-md-4'>
                <Image
                  src='https://wholesale-ls-marketing.s3.amazonaws.com/Hamilton-Waterfall.jpg'
                  fluid
                  sizes='(max-width: 380px) 100vw, 380px'
                ></Image>
                <div className='centered'>
                  <h1>Hamilton</h1>
                </div>
              </div>
              <div className='col-md-4'>
                <Image
                  src='https://wholesale-ls-marketing.s3.amazonaws.com/Toronto-CN+Tower.jpg'
                  fluid
                ></Image>
                <div className='centered'>
                  <h1>Toronto</h1>
                </div>
              </div>
              <div className='col-md-4'>
                <Image
                  src='https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa+Parliment.jpg'
                  fluid
                ></Image>
                <div className='centered'>
                  <h1>Ottawa</h1>
                </div>
              </div>
            </Row>
          </div>

          <div className='about-us-container'>
            <Row className='about-us-text'>
              <Col xs={6}>
                <h1>First Marketplace for Off-Market Deals.</h1>
                <h3>Reach a Wider Audence</h3>

                <div class='title-underline'></div>

                <p>
                  Instead of going to meetups or Facebook group to connect with
                  wholesalers/buyers list, come to one centralized location to
                  meet everyone.
                </p>

                <p>Think of this as one giant buyer's list, for everyone!</p>
                <Button variant='success' href='/properties'>
                  View Properties
                </Button>
              </Col>
              <Col xs={6}>
                <img
                  alt='awesome proerty'
                  src='https://wholesale-ls-marketing.s3.amazonaws.com/undraw_mobile_marketing_iqbr+brown+right.svg'
                />
              </Col>
            </Row>

            <Row className='about-us-text'>
              <Col xs={6}>
                <img
                  alt='awesome proerty'
                  src='https://wholesale-ls-marketing.s3.amazonaws.com/undraw_online_connection_6778.svg'
                />
              </Col>
              <Col xs={6}>
                <h1>First Marketplace for Off-Market Deals.</h1>
                <h3>Build Relationships</h3>
                <div class='title-underline'></div>
                <p>
                  Connect and chat with other Real Estate Professionals. Whether
                  it's building a connection with a Wholesale/Buyer, or looking
                  for someone to jump into your next project.
                </p>
                <p>
                  We aim to bring everyone together to foster more Joint Venture
                  Opportunities.
                </p>
                <Button variant='success' href='/properties'>
                  View Deals
                </Button>
              </Col>
            </Row>

            <Row className='about-us-text'>
              <Col xs={6}>
                <h1>First Marketplace for Off-Market Deals.</h1>
                <h3>Curated Marketplace</h3>

                <div class='title-underline'></div>

                <p>
                  Find Properties that match your preferences in seconds. We'll
                  use your previous history and metrics to recommend properties
                  that are similar or in the same area.
                </p>

                <p>Think of it as your own Personal Concierge.</p>
                <Button variant='success' href='/properties'>
                  Browse Properties
                </Button>
              </Col>
              <Col xs={6}>
                <img
                  alt='awesome proerty'
                  src='https://wholesale-ls-marketing.s3.amazonaws.com/undraw_house_searching_n8mp+brown.svg'
                />
              </Col>
            </Row>
          </div>

          <div className='how-it-works'>
            <Row>
              <Col xs={6}>
                <h1>How it works</h1>
                <h3>We'll help streamline the entire transaction.</h3>
              </Col>
            </Row>
            <Row>
              <Col xs='6' sm='3' className='text-center'>
                <Card
                  className='text-center'
                  as='a'
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  <CardBody>
                    <CardTitle>1) Find your Ideal Contract</CardTitle>
                    <CardText tag='p'>
                      Browse through our curated selection of contracts for one
                      that fits your budget and location.
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col xs='6' sm='3' className='text-center'>
                <Card
                  as='a'
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  <CardBody>
                    <CardTitle>2) Message the Wholeseller</CardTitle>
                    <CardText tag='p'>
                      Once you've found a contract that fits suits your goals,
                      you can message the wholeseller directly for more
                      information.
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col xs='6' sm='3' className='text-center'>
                <Card
                  as='a'
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  <CardBody>
                    <CardTitle>3) Schedule a Showing</CardTitle>
                    <CardText tag='p'>
                      After you've spoken with the Wholeseller and you're ready
                      to view the property, you can schedule and book a time to
                      view the property.
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col xs='6' sm='3' className='text-center'>
                <Card
                  as='a'
                  onClick={"/properties"}
                  style={{ cursor: "pointer" }}
                >
                  <CardBody>
                    <CardTitle>4) Purchase the Contract</CardTitle>
                    <CardText tag='p'>
                      When you're happy with the price and condition of the
                      home, you can than finalize the contract and finish the
                      assignment over to your name. Happy Investing!
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>

          <div className='newsletter'>
            <div className='green-bg'></div>
            <div className='narrow-box'>
              <div className='newsletter-box'>
                <h1>Subscribe to our Newsletter</h1>
                <h3>Receive the Best Property Deals</h3>
                <Row>
                  <FormGroup controlId='subscribe' bsSize='small'>
                    <FormControl placeholder='Name' />
                    <FormControl type='email' placeholder='Email' />
                  </FormGroup>
                </Row>
              </div>
            </div>

            <div className='image-bg'></div>
          </div>
        </div>
      )}
    </div>
  );
}
