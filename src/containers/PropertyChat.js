import "./PropertyChat.css";

import { API, Auth } from "aws-amplify";
import { Modal, Breadcrumb, Form, FormControl } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import Loading from "./Loading";
// import config from "../config";
import backArrowIcon from "../assets/back-icon.png";
import mapPinIcon from "../assets/map-pin-icon.png";
// import Slider from "../components/Slider";

// const images = [
//   "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
//   "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
//   "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
//   "https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80",
// ];

export default function PropertyChat(props) {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [propertyOwner, setPropertyOwner] = useState(false);
  const [profile, setProfile] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [viewCreateAccountModal, setViewCreateAccountModal] = useState(null);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState(null);
  const [conversationMessages, setConversationMessages] = useState(null);

  useEffect(() => {
    function loadProperty() {
      return API.get("properties", `/properties/${props.match.params.id}`);
    }

    function loadProfile(userId) {
      return API.get("profiles", `/profiles/${userId}`);
    }

    function loadConversation(propertyOwnerId) {
      return API.get("properties", `/properties/${props.match.params.id}/chat`, {
        queryStringParameters: {
          propertyOwner: propertyOwnerId,
        }
      });
    }

    function loadConversationMessages(conversationId) {
      return API.get("properties", `/conversation/messages`, {
        queryStringParameters: {
          conversationId: conversationId
        }
      })
    }

    

    async function onLoad() {
      try {
        const user = await Auth.currentUserInfo();
        let userId = "none";
        if (user) userId = user["id"];
        if (user) setUserEmail(user.attributes.email);
        const property = await loadProperty();
        console.log(property);
        const profile = await loadProfile(property.userId);
        setProfile(profile);
        setPropertyOwner(userId === property.userId);
        setProperty(property);
        setIsLoading(true);
        const existingConversation = await loadConversation(property.userId);
        console.log("existingConversation below");
        console.log(existingConversation);
        setConversation(existingConversation);
        console.log("after setConversation");
        console.log(conversation);
        if(existingConversation) {
          const existingConversationMessages = await loadConversationMessages(existingConversation.conversationId);
          setConversationMessages(existingConversationMessages);
          console.log("existingConversationMessages Below");
          console.log(existingConversationMessages);
        };
        console.log("out of if statement existing conversation messages");
        console.log(conversationMessages);
        console.log(conversation);
        console.log(property);
      } catch (e) {
        alert(e);
        // console.log(profile.userId);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function createConversation(propertyOwnerId) {
    return API.post("properties", `/properties/${props.match.params.id}/chat`, {
      body: {
        propertyOwner: propertyOwnerId,
      }
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      if(conversation == null) {
        console.log("Existing conversation below");
        console.log(conversation);
        const newConversation = await createConversation(property.userId);
        console.log(newConversation);
        setConversation(newConversation);
      };
      const response = await createMessage({
        message: message,
        conversationId: conversation.conversationId,
        propertyOwner: profile.userId,
      });
      console.log(response);
      props.history.push(`/properties/${property.propertyId}/chat`);
    } catch (e) {
      alert(e);
      setIsLoading(false);
      console.log(property.userId)
    }
  }

  function createMessage(message) {
    return API.post("properties", `/properties/${props.match.params.id}/message`, {
      body: message,
    });
  }

  const testMessages = [
    { senderId: 'Kevin',
      content: "testing messages",
      conversationId: 123,
    },
    { senderId: 'Jon',
      content: "Hey how's it going?",
      conversationId: 123,
    },
    { senderId: 'Kevin',
      content: "Good, you",
      conversationId: 123,
    },
  ]




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
      <div className='ViewProperty'>
        <div className='container'>
          <div className='ViewProperty__Wrapper'>
            {isLoading ? (
              <div>
                {propertyOwner ? (
                  <div>
                    <a
                      href={`/properties/${property.propertyId}/edit`}
                      className='other-btn'
                    >
                      Edit Property
                    </a>
                    <br />
                    <br />
                    <br />
                  </div>



                ) : null}

                <div className='backLink'>
                  <img src={backArrowIcon} alt='Back Arrow Icon' />
                  <a className='navLink' href={`/properties`}>
                    Back to List
                  </a>
                </div>

                <div className='ViewProperty__Header'>
                  <h2>{property.title}</h2>
                  <div className='ViewProperty__Address'>
                    <img src={mapPinIcon} alt='Map Pin Icon' />
                    <p>{property.address}</p>
                  </div>
                </div>

                <div className='ViewProperty__Row-Highlights'>
                  {property.bedroom && <div>{property.bedroom} Bedrooms</div>}
                  {property.bathroom && (
                    <div>{property.bathroom} Bathrooms</div>
                  )}
                  {property.propertType && <div>{property.propertyType}</div>}
                </div>





                <div className='chat-container'>
                  

                  
                    <ul className="message-list">
                      {/* {conversationMessages.map((conversationMessages, index) => {
                        return (
                          <li 
                          // key={testMessages.conversationId} 
                          className="message">
                            <div>{conversationMessages.participants}</div>
                            <div>{conversationMessages.message}</div>
                          </li>
                        )
                      })} */}
                    </ul>


                    <div className="send-message-container">
                        <Form 
                          // onSubmit={handleSubmit}
                          className="send-message-form">
                            <FormControl
                              onChange={(e) => setMessage(e.target.value)}
                              value={message}
                              placeholder="Type your message and hit Enter"
                              type="text">
                            </FormControl>
                        
                      
                        <button className='secondary-btn' onClick={handleSubmit}>Submit</button>
                        </Form>

                    </div>

                    
                  


                </div>
              </div>
            ) : (
                <Loading />
              )}
            <Modal
              show={viewCreateAccountModal}
              onHide={() => setViewCreateAccountModal(false)}
              dialogClassName='modal-90w'
            >
              <Modal.Body>
                <div className='modal-card text-center'>
                  <h1>create account first</h1>
                  <p>
                    You'll have to create an account to get more info on this
                    property
                  </p>
                  <a
                    alt='create account btn'
                    className='secondary-btn'
                    href='/signup'
                  >
                    Create an account
                  </a>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
