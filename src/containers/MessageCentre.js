import "./MessageCentre.css";

import { API, Auth } from "aws-amplify";
import { Modal, Breadcrumb, Form, FormControl, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import Loading from "./Loading";
// import config from "../config";
import backArrowIcon from "../assets/back-icon.png";
import mapPinIcon from "../assets/map-pin-icon.png";
// import Slider from "../components/Slider";

import Dropdown from "../components/Dropdown";

export default function MessageCentre(props) {
    const [property, setProperty] = useState(null);
    const [profile, setProfile] = useState(null);
    const [allProfiles, setAllProfiles] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [allConversations, setAllConversations] = useState([]);
    const [conversation, setConversation] = useState(null);
    const [conversationMessages, setConversationMessages] = useState(null);
    const [createConversation, setCreateConversation] = useState(null);
    const [newMessage, setNewMessage] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        function listConversation() {
            return API.get("properties", `/listconversation`);
        }

        function loadProfile(userId) {
            return API.get("profiles", `/profiles/${userId}`);
        }

        function listProfile() {
            return API.get("profiles", `/listprofile`);
        }

        async function onLoad() {
            try {
                const user = await Auth.currentUserInfo();
                let userId = "none";
                if (user) userId = user["id"];
                const currentUser = await loadProfile(userId);
                setCurrentUser(currentUser);
                const allConversations = await listConversation();
                console.log("allConversations is below");
                console.log(allConversations);
                setAllConversations(allConversations);
                const allProfiles = await listProfile();
                setAllProfiles(allProfiles);
                console.log("allProfiles is below");
                console.log(allProfiles);


            } catch (e) {
                alert(e);
            }
        }

        onLoad();
    }, [props.match.params.id]);

    console.log("all Conversations is now below");
    console.log(allConversations);

    const filterProfiles = allProfiles.filter((val) => {
        if (search == "") {
            return val
        } else if (val.fullName.toLowerCase().includes( search.toLowerCase() )) {
            return val
        }
    })

    console.log("filterPrifles is below");
    console.log(filterProfiles);

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
                <Col xs={4}>
                    <div className='ViewProperty'>
                        <div className='container'>
                            <div className='ViewProperty__Wrapper'>
                                <div className="Conversation-List">

                                    <h1>Messages</h1>
                                    <button className='secondary-btn'
                                        onClick={() => setNewMessage(true)}>
                                        Create Message
                                        </button>

                                    <div><h2>{newMessage}</h2></div>
                                    <FormControl
                                        value={newMessage}
                                        componentClass='textarea'
                                        placeholder='Enter the Comparables'
                                        name='comparableProperties'
                                        // rows={4}
                                    />
                                    {allConversations &&
                                        allConversations.map((allConversations, index) => {
                                            return (
                                                <li className="message">
                                                    <div>{allConversations.participants}</div>
                                                </li>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                
                <Col xs={8}>
                    <div className='ViewProperty'>
                        <div className='container'>
                            <Row>
                            <div className='ViewProperty__Wrapper'>
                                    <h1>New Message</h1>
                                    {search}
                                    <input type="text" placeholder="Type a name or multiple names..." onChange={ e => setSearch(e.target.value) }></input>
                                    <h1>List of Names</h1>
                                    {filterProfiles.map((profiles, i) => (
                                        <div key={i} {...profiles}> 
                                            <div>{profiles.fullName} {profiles.userId}</div>
                                        </div>
                                    ))}
                            </div>
                            </Row>
                            <Row>
                            <div className='container'>
                                <h1>New Dropdown Below</h1>
                                
                                <Dropdown title="Select Profile" items={filterProfiles} multiSelect>
                                <input type="text" placeholder="Type a name or multiple names..." onChange={ e => setSearch(e.target.value) }></input>
                                </Dropdown>
                            </div>
                            </Row>
                        </div>
                    </div>
                </Col>
                
                    
               

            </Row>


        </div>




    );

}