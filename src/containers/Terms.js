import "./Terms.css";

import { Col, Row } from "react-bootstrap";
import React, { Component } from "react";

export default class Terms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }
  render() {
    return (
      <div className="Terms container">
        <Row>
          <Col sm={12}>
            <h1 className="text-center">Terms of Use</h1>
              <h3>Terms Of Service Agreement</h3>
                <p>By using this web site, you are agreeing to comply and be bound by the following terms of service and use. Please review the following terms in their entirety and ensure their comprehension before using and viewing this web site.
                Spammers Not Welcome Here!</p>
              <h3>-Spam Policy - </h3>
                
                <p>This should go without saying, but we'll say it anyway: it's not OK to spam us, create fake accounts, scrap/copy our data and content. If you try, we will immediately close your Uncommon Estate account.
                The terms “us”, “we”, “our”, or “owners” refers to “Uncommon Estate” and the administrative operators of this web site, UncommonEstate.com “You” refers to the user or viewer of this web site.
                That this “Terms of Use“ does not impose a financial obligation on you or create any representation agreement between you and Uncommon Estate.
                Consent to the fact that your Personal Information, including first and last name, email address, and phone number may be collected, used or disclosed. </p>
                <p>The information here is deemed reliable but not guaranteed by Uncommon Estate. </p>
              <h3>Copyright</h3>
                <p>The listing content on this website is protected by copyright and other laws, and is intended solely for the private, non-commercial use by individuals. Any other reproduction, distribution or use of the content, in whole or in part, is specifically forbidden. The prohibited uses include commercial use, “screen scraping”, “database scraping”, and any other activity intended to collect, store, reorganize or manipulate data on the pages produced by or displayed on this website.</p>
                <p>The content in its entirety, including text content, graphics, layouts, and all source code, belong to the owners of the web site. This term is protected by intellectual property rights and copyright law. Copying, redistribution, use or publication either for free or for monetary gain is strictly prohibited. Some of the content on the site is the copyrighted and licensed work of third parties.</p>
              <h3>Terms of Use</h3>
                <p>1. The content of this web site in its entirety is subject to change without notice. Its purpose is for your general information only.</p>
                <p>2. No parties guarantee the accuracy, timeliness, performance, completeness, or suitability of the content and information found on this site. You acknowledge that errors or inaccuracies may exist, and that the owners of the site are in no way liable for any such errors.</p>
                <p>3. The owners of the site are not responsible and hold no liability for third-party content that may be posted on the site by end users, or for content that is linked to from this web site including other web sites.</p>
                <p>4. The use of and viewing of information on this site is at your own risk. Any consequences of use that may occur are not the liability of the web site owners.</p>
                <p>5. Unauthorized use of this web site or its contents may give rise to a claim for damages and/or be a criminal offense enforceable by local and international law.</p>
                <p>6. We reserve the right to restrict access to certain areas of the web site at our own discretion. If a username and password, or any other access credentials, are provided to you as the end user, it is your responsibility to keep such information confidential.</p>
                <p>7. The owners of the web site are not responsible for user-generated content, and not liable for any violations that such content may constitute, Uncommon Estate SQFT data is an approximate area measurement and is not guaranteed by any means to be an exact "as build" measurement. This data should only be used as a guide and should be confirmed by a buyer.</p>


          </Col>
        </Row>
      </div>
    );
  }
}
