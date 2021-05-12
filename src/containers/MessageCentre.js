import "./MessageCentre.css";

import { API, Auth } from "aws-amplify";
import {
  Modal,
  Breadcrumb,
  Form,
  FormGroup,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";

export default function MessageCentre(props) {
  const [property, setProperty] = useState(null);
  const [allProfiles, setAllProfiles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [allConversations, setAllConversations] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [conversationMessages, setConversationMessages] = useState(null);
  const [createConversation, setCreateConversation] = useState(null);
  const [newMessage, setNewMessage] = useState(false);

  const [profilesSelected, setProfilesSelected] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchDropdownExpanded, setSearchDropdownExpanded] = useState(false);

  useEffect(() => {
    function listConversation() {
      return API.get("properties", `/listconversation`);
    }

    function loadProfile(userId) {
      return API.get("profiles", `/profiles/${userId}`);
    }

    function listProfiles() {
      return API.get("profiles", `/listprofile`);
    }

    function loadConversationMessages(conversationId) {
      return API.get("properties", `/conversation/messages`, {
        queryStringParameters: {
          conversationId: conversationId,
        },
      });
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
        const allProfiles = await listProfiles();
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

  // User search bar functions
  const onSelectDropdownProfile = (event) => {
    const profile = event.currentTarget.getAttribute("data-profiles");
    setProfilesSelected((profiles) => profiles.push(profile));
    setSearchInput(profile);
    setSearchDropdownExpanded(false);
  };
  const onSearchInputChange = (input) => {
    const { value } = input.target;
    setSearchInput(value);
    if (value.length >= 2) {
      setSearchDropdownExpanded(true);
    } else {
      setSearchDropdownExpanded(false);
    }
  };
  const handleOnBlurSearch = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setSearchDropdownExpanded(false);
    }
  };
  const filteredData = (profileData, maxResults) => {
    let count = 0;
    return Object.keys(profileData).filter((location) => {
      return (
        location.toLowerCase().includes(searchInput.toLowerCase()) &&
        count++ < maxResults
      );
    });
  };

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
                <div className='Conversation-List'>
                  <h1>Messages</h1>
                  <button
                    className='secondary-btn'
                    onClick={() => setNewMessage(true)}
                  >
                    Create Message
                  </button>

                  <div>
                    <h2>{newMessage}</h2>
                  </div>
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
                        <li className='message'>
                          <div>{allConversations.participants}</div>
                        </li>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={8}>
          <div className='MessageCentre'>
            <div className='container'>
              <Row>
                <div
                  className='MessageCentre__Wrapper'
                  onBlur={handleOnBlurSearch}
                >
                  <h1>List of Names</h1>
                  <FormGroup
                    controlId='filterPropertyType'
                    className='Locations-Search-Bar'
                  >
                    <div className='Locations-Search-Bar__Wrapper'>
                      <input
                        type='text'
                        placeholder='Search'
                        value={searchInput}
                        onChange={onSearchInputChange}
                      />
                      <a
                        onClick={() =>
                          setSearchDropdownExpanded(!searchDropdownExpanded)
                        }
                        onBlur={() => setSearchDropdownExpanded(false)}
                      />
                    </div>
                    <div
                      className={`Locations-Search-Bar__Dropdown-Content ${
                        searchDropdownExpanded ? "active" : ""
                      }`}
                    >
                      {filteredData(allProfiles, 10).map((item) => (
                        <a
                          onClick={onSelectDropdownProfile}
                          data-profiles={item}
                          key={item}
                          tabIndex='0'
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </FormGroup>
                </div>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
