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
            <h1 className="text-center">Terms of Service</h1>
            <p>
              The following Policy governs your participation in the Program
              presented by Conversify (hereinafter referred to as “Company”)
              Please read this Policy carefully. By visiting and using the
              Program Portal/Membership Site you agree that your use of our
              Site, participation in our Program, and use of Program materials
              is governed by the following terms and conditions.
            </p>
            <p>
              We are committed to providing all participants with a positive
              experience. Thus, COMPANY may, at its sole discretion, limit,
              suspend, or terminate your participation in any of its programs,
              live, recorded, social media-based or digital without refund or
              forgiveness of remaining payments if: you become disruptive or
              difficult to work with; you fail to follow the program guidelines;
              or, you impair the participation of our instructors or
              participants in our program(s).
            </p>
            <p>Program Deliverables:</p>
            <p>
              Lifetime access to the Conversify e-learning training portal,
              content &amp; worksheets.
            </p>
            <p>12-month access to the private Slack community.</p>
            <p>
              Three 1-hour weekly community mentorship calls + on-demand support
              (inside the Slack Community)
            </p>
            <p>Content:</p>
            <p>
              Program education and information is intended for a general
              audience and does not purport to be, nor should it be construed
              as, specific advice, tailored to any inpidual.
            </p>
            <p>
              All materials, procedures, policies, and standards, all teaching
              manuals, all teaching aids, all supplements and the like that have
              been or will be made available Company or its designated
              facilitators, or any other source, oral or written, are for
              personal use in or in conjunction with this training program only.
            </p>
            <p>
              Program content is for personal use only, and may not be sold,
              recorded, videotaped, shared, taught, given away, or otherwise
              pulged without the express written consent of Company, or its
              designated agent.
            </p>
            <p>
              {" "}
              The information contained in program material is strictly for
              educational purposes. Therefore, if you wish to apply ideas
              contained in this material, you are taking full responsibility for
              your actions.
            </p>
            <p>
              We assume no responsibility for errors or omissions that may
              appear in any program materials.
            </p>
            <p>
              Usernames and passwords may not be shared with any third-parties.
            </p>
            <p>
              Any violation of Company’s policies regarding content usage shall
              result in the immediate termination of your enrollment without
              refund.
            </p>
            <p>
              Privacy &amp; Confidentiality: We respect your privacy and must
              insist that you respect the privacy of fellow Program
              participants.
            </p>
            <p>
              We respect your confidential and proprietary information in the
              form of ideas, plans and trade secrets (collectively,
              "Confidential Information") and must insist that you respect the
              same rights of fellow Program participants and of the Company.
            </p>
            <p>Thus, you agree:</p>
            <p>
              not to infringe any Program - participants or the Company's
              copyright, patent, trademark, trade secret or other intellectual
              property rights;
            </p>
            <p>
              that any Confidential Information shared by Program participants
              or any representative of the Company is confidential and
              Proprietary, and belongs solely and exclusively to the Participant
              who discloses it or the Company;
            </p>
            <p>
              not to disclose such information to any other person or use it in
              any manner other than in discussion with other Program
              participants during Program sessions;
            </p>
            <p>
              that all materials and information provided to you by the Company
              are its confidential and proprietary intellectual property belong
              solely and exclusively to the Company, and may only be used by you
              as authorized by the Company;
            </p>
            <p>
              the reproduction, distribution and sale of these materials by
              anyone but the Company is strictly prohibited;
            </p>
            <p>
              that if you violate, or display any likelihood of violating, any
              of your agreements contained in this paragraph the Company and/or
              the other Program participant(s) will be entitled to injunctive
              relief to prohibit any such violations to protect against the harm
              of such violations.
            </p>
            <p>
              While you are free to discuss your personal results from our
              programs and training, you must keep the experiences and
              statements, oral or written, of all other participant(s) in the
              strictest of confidence.
            </p>
            <p>Interactive Features</p>
            <p>
              {" "}
              It is a condition of your use of the Site and participation in the
              Program that you do not:
            </p>
            <p>
              Restrict or inhibit any other user from using and enjoying the
              Site.
            </p>
            <p>
              Use the Site to impersonate any person or entity, or falsely state
              or otherwise misrepresent your affiliation with a person or
              entity.
            </p>
            <p>
              Interfere with or disrupt any servers or networks used to provide
              the Site or its features, or disobey any requirements, procedures,
              policies or regulations of the networks we use to provide the
              Site.
            </p>
            <p>
              Use the Site to instigate or encourage others to commit illegal
              activities or cause injury or property damage to any person.
            </p>
            <p>
              Gain unauthorized access to the Site, or any account, computer
              system, or network connected to this Site, by means such as
              hacking, password mining or other illicit means.
            </p>
            <p>
              Obtain or attempt to obtain any materials or information through
              any means not intentionally made available through this Site.
            </p>
            <p>
              Use the Site to post or transmit any unlawful, threatening,
              abusive, libelous, defamatory, obscene, vulgar, pornographic,
              profane or indecent information of any kind, including without
              limitation any transmissions constituting or encouraging conduct
              that would constitute a criminal offense, give rise to civil
              liability or otherwise violate any local, state, national or
              international law.
            </p>
            <p>
              Use the Site to post or transmit any information, software or
              other material that violates or infringes upon the rights of
              others, including material that is an invasion of privacy or
              publicity rights or that is protected by copyright, trademark or
              other proprietary right, or derivative works with respect thereto,
              without first obtaining permission from the owner or rights
              holder.
            </p>
            <p>
              Use the Site to post or transmit any information, software or
              other material that contains a virus or other harmful component.
            </p>
            <p>
              Use the Site to post, transmit or in any way exploit any
              information, software or other material for commercial purposes,
              or that contains advertising.
            </p>
            <p>
              Use the Site to advertise or solicit to anyone to buy or sell
              products or services, or to make donations of any kind, without
              our express written approval.
            </p>
            <p>
              Gather for marketing purposes any email addresses or other
              personal information that has been posted by other users of the
              Site.
            </p>
            <p>
              COMPANY may host Slack groups, message boards, chats and other
              public forums. Any user failing to comply with the terms and
              conditions of this Agreement may be expelled from and refused
              continued access to, the message boards, chats or other public
              forums in the future. COMPANY or its designated agents may remove
              or alter any user-created content at any time for any reason.
              Groups, chats and other public forums are intended to serve as
              discussion centers for users and subscribers. Information and
              content posted within these public forums may be provided by
              COMPANY staff, COMPANY's outside contributors, or by users not
              connected with COMPANY, some of whom may employ anonymous user
              names. COMPANY expressly disclaims all responsibility and
              endorsement and makes no representation as to the validity of any
              opinion, advice, information or statement made or displayed in
              these forums by
            </p>
            <p>
              {" "}
              third parties, nor are we responsible for any errors or omissions
              in such postings, or for hyperlinks embedded in any messages.
              Under no circumstances will we, our affiliates, suppliers or
              agents be liable for any loss or damage caused by your reliance on
              information obtained through these forums. The opinions expressed
              in these forums are solely the opinions of the participants, and
              do not reflect the opinions of COMPANY or any of its subsidiaries
              or affiliates.
            </p>
            <p>
              COMPANY has no obligation whatsoever to monitor any of the content
              or postings on the message boards, chat rooms or other public
              forums on the Sites. However, you acknowledge and agree that we
              have the absolute right to monitor the same at our sole
              discretion. In addition, we reserve the right to alter, edit,
              refuse to post or remove any postings or content, in whole or in
              part, for any reason and to disclose such materials and the
              circumstances surrounding their transmission to any third party in
              order to satisfy any applicable law, regulation, legal process or
              governmental request and to protect ourselves, our clients,
              sponsors, users and visitors.
            </p>
            <p>
              Limitation of Liability UNDER NO CIRCUMSTANCES, INCLUDING, BUT NOT
              LIMITED TO, NEGLIGENCE, SHALL WE, OUR SUBSIDIARY AND PARENT
              COMPANIES OR AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT,
              INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES THAT RESULT FROM THE
              USE OF, OR THE INABILITY TO USE, THE SITE, INCLUDING OUR
              MESSAGING, BLOGS, COMMENTS OF OTHERS, BOOKS, EMAILS, PRODUCTS, OR
              SERVICES, OR THIRD-PARTY MATERIALS, PRODUCTS, OR SERVICES MADE
              AVAILABLE THROUGH THE SITE OR BY US IN ANY WAY, EVEN IF WE ARE
              ADVISED BEFOREHAND OF THE POSSIBILITY OF SUCH DAMAGES. (BECAUSE
              SOME STATES AND PROVINCES DO NOT ALLOW THE EXCLUSION OR LIMITATION
              OF CERTAIN CATEGORIES OF DAMAGES, THE ABOVE LIMITATION MAY NOT
              APPLY TO YOU. IN SUCH STATES AND PROVINCES, OUR LIABILITY AND THE
              LIABILITY OF OUR SUBSIDIARY AND PARENT COMPANIES OR AFFILIATES IS
              LIMITED TO THE FULLEST EXTENT PERMITTED BY SUCH STATE/PROVINCIAL
              LAW.) YOU SPECIFICALLY ACKNOWLEDGE AND AGREE THAT WE ARE NOT
              LIABLE FOR ANY DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF ANY
              USER. IF YOU ARE DISSATISFIED WITH THE SITE, ANY MATERIALS,
              PRODUCTS, OR SERVICES ON THE SITE, OR WITH ANY OF THE SITE'S TERMS
              AND CONDITIONS, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE
              USING THE SITE AND THE PRODUCTS, SERVICES AND/OR MATERIALS. THIS
              SITE IS CONTINUALLY UNDER DEVELOPMENT AND COMPANY. MAKES NO
              WARRANTY OF ANY KIND, IMPLIED OR EXPRESS, AS TO ITS ACCURACY,
              COMPLETENESS OR APPROPRIATENESS FOR ANY PURPOSE. NEITHER 9189912
              CANADA CORP. NOR ITS OWNERS, OFFICERS, DIRECTORS, EMPLOYEES,
              SUBSIDIARIES, AFFILIATES, LICENSORS, SERVICE PROVIDERS, CONTENT
              PROVIDERS AND AGENTS ARE FINANCIAL ADVISERS AND NOTHING CONTAINED
              HEREIN IS INTENDED TO BE OR TO BE CONSTRUED AS FINANCIAL ADVICE.
            </p>
            <p>Dispute Resolution</p>
            <p>
              All disputes arising under or concerning this Agreement are to be
              submitted to binding arbitration, in Toronto, Ontario, Canada.{" "}
            </p>
            <p>
              You may only resolve disputes with us on an inpidual basis, and
              may not bring a claim as a plaintiff or a class member in a class,
              consolidated, or representative action. Class arbitrations, class
              actions, private attorney general actions, and consolidation with
              other arbitrations aren't allowed.
            </p>
            <p>
              The arbitrator may not consolidate more than one person’s claims,
              and may not otherwise preside over any form of a class or
              representative proceeding or claims (such as a class action,
              consolidated action or private attorney general action) unless all
              relevant parties specifically agree to do so following initiation
              of the arbitration.
            </p>
            <p>Refund Policy</p>
            <p>
              Unless otherwise stated on the specific products sales page and
              order form all of our products, programs and services purchased on
              our Site are non-refundable.
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}
