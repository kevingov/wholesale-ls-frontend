

<div className="grid-template">
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
        Toronto
      </CardText>
    </CardBody>
  </Card>
  <img src="https://wholesale-ls-marketing.s3.amazonaws.com/Modena-Walls.jpg"
  alt="grid-photos">
  </img>
</div>
<div className="col-6">
  <Row>
    <Col xs={6}>
      <Card
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
      
        </CardBody>
      </Card> 

      <Image src="https://wholesale-ls-marketing.s3.amazonaws.com/Ottawa-Parliament.jpg" rounded></Image>
    </Col>

    <Col xs={6}>
      <Card
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
      </Card>
      <Image src="https://wholesale-ls-marketing.s3.amazonaws.com/Hamilton-Skyline.jpg" fluid></Image>
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
          <CardTitle>Windsor</CardTitle>
          <CardText tag="p">
            When you're happy with the price and condition of the home, you can than finalize the contract and finish the assignment over to your name. Happy Investing! 
          </CardText>
        </CardBody>
      </Card>
    </div>  
  </Row>
</div>
</div>  


// for mid dot 
//  ${property.price} &middot; {property.address}