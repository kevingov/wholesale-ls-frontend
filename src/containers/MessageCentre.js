import "./PropertyChat.css";

import { API, Auth } from "aws-amplify";
import { Modal, Breadcrumb, Form, FormControl, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import Loading from "./Loading";
// import config from "../config";
import backArrowIcon from "../assets/back-icon.png";
import mapPinIcon from "../assets/map-pin-icon.png";
// import Slider from "../components/Slider";

export default function MessageCentre(props) {
    const [property, setProperty] = useState(null);
    const [profile, setProfile] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [allConversations, setAllConversations] = useState(null);
    const [conversation, setConversation] = useState(null);
    const [conversationMessages, setConversationMessages] = useState(null);

    useEffect(() => {
        function listConversation(userId) {
            return API.get("conversations", `/listconversations`);
        }

        function loadProfile(userId) {
            return API.get("profiles", `/profiles/${userId}`);
        }

        async function onLoad() {
            try {
                const user = await Auth.currentUserInfo();
                let userId = "none";
                if (user) userId = user["id"];
                const currentUser = await loadProfile(userId);
                setCurrentUser(currentUser);
                const allConversations = listConversation(userId);
                setAllConversations(allConversations);

            
        } catch (e) {
            alert(e);
        }
    }
    
    onLoad();
    }, [props.match.params.id]);

    return (
        <div className='Index'>
          <div className='Breadcrumbs'>
            <div className='Breadcrumbs-items container'>
              <Breadcrumb>
                <Breadcrumb.Item href='/properties'>Properties</Breadcrumb.Item>
                <Breadcrumb.Item active>View Property</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>

        <Row>
            <Col xs={2}>
                <div className="Conversation-List">
                    
                    {
                    allConversations &&
                    allConversations.map((allConversations, index) => {
                        return (
                            <li className="message">
                                <div>{allConversations.participants}</div>
                            </li>
                        )      
                    })
                }
                </div>
            </Col>
            <Col xs={10}>

            </Col>


        </Row>


        </div>




    );
    
}