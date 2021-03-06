import "./PropertyChat.css";

import { API, Auth } from "aws-amplify";
import { Modal, Breadcrumb, Form, FormControl } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import Loading from "./Loading";
// import config from "../config";
import backArrowIcon from "../assets/back-icon.png";
import mapPinIcon from "../assets/map-pin-icon.png";
// import Slider from "../components/Slider";

export default function PropertyChat(props) {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [propertyOwner, setPropertyOwner] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
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

    // function loadConversation(propertyOwnerId) {
    //   return API.get(
    //     "properties",
    //     `/properties/${props.match.params.id}/chat`,
    //     {
    //       queryStringParameters: {
    //         propertyOwner: propertyOwnerId,
    //       },
    //     }
    //   );
    // }

    function loadConversationMessages(conversationId) {
      return API.get("properties", `/conversation/getmessages`, {
        queryStringParameters: {
          conversationId: conversationId,
          
        },
      });
    }

    function loadConversationFirstMessage(conversationId) {
      return API.get("properties", `/conversation/getfirstmessages`, {
        queryStringParameters: {
          conversationId: conversationId,
        },
      });
    }

    function checkConversation(test) {
      return API.get("properties", `/conversation/checkconversation`, {
        queryStringParameters: {
          participantIds: test,
          numberOfParticipants: test.length,
        },
      });
    }

    const test = ['us-east-1:30ad799d-890f-4d4a-a041-5647a2b67c13', 'us-east-1:812b2d43-37db-4ec2-8e18-06174817874b']


    async function onLoad() {
      try {
        const user = await Auth.currentUserInfo();
        let userId = "none";
        if (user) userId = user["id"];
        if (user) setUserEmail(user.attributes.email);
        const currentUser = await loadProfile(userId);
        setCurrentUser(currentUser);
        const property = await loadProperty();
        const profile = await loadProfile(property.userId);
        setProfile(profile);
        setPropertyOwner(userId === property.userId);
        setProperty(property);
        setIsLoading(true);
        // const existingConversation = await loadConversation(property.userId);
        // setConversation(existingConversation);
        // if (existingConversation) {
        //   const existingConversationMessages = await loadConversationMessages(
        //     existingConversation.conversationId
        //   );
        //   setConversationMessages(existingConversationMessages);
        // }
        console.log(test.length);
        // const testCheckConversation = await checkConversation(test);
        console.log("testCheckConversation Below");
        // console.log(testCheckConversation);
        const firstMessage = await loadConversationFirstMessage("307a3180-cac3-11eb-b177-9136a0612457");
        console.log(firstMessage);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function createConversation(propertyOwnerId) {
    return API.post("properties", `/properties/${props.match.params.id}/chat`, {
      body: {
        propertyOwner: propertyOwnerId,
      },
    });
  }

  function createConversation2(test2) {
    return API.post("properties", `/properties/${props.match.params.id}/chat`, {
      body: {
        propertyOwner: test2,
      },
    });
  }

  function addMessageToConversationMessages(response) {
    setConversationMessages((conversationMessages) => [
      ...conversationMessages,
      response,
    ]);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      if (conversation === null) {
        const newConversation = await createConversation(property.userId);
        setConversation(newConversation);
      }
      const response = await sendMessage({
        message: message,
        conversationId: conversation.conversationId,
        propertyOwner: profile.userId,
        senderName: currentUser.firstName + " " + currentUser.lastName,
      });
      addMessageToConversationMessages(response);
      setMessage("");
      props.history.push(`/properties/${property.propertyId}/chat`);
    } catch (e) {
      alert(e);
      setIsLoading(false);
      console.log(property.userId);
    }
  }

  function sendMessage() {
    return API.post(
      "properties",
      `/properties/${props.match.params.id}/message`,
      {
        body: {
          propertyOwner: profile.userId,
          content: message,
          conversationId: conversation.conversationId,
          senderName: currentUser.firstName + " " + currentUser.lastName,
        },
      }
    );
  }

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
                  <ul className='message-list'>
                    {conversationMessages &&
                      conversationMessages.map(
                        (conversationMessages, index) => {
                          return (
                            <li
                              // key={testMessages.conversationId}
                              className='message'
                            >
                              <div>
                                {" "}
                                <b>{conversationMessages.senderName}</b>{" "}
                                {conversationMessages.createdAt}{" "}
                              </div>
                              <div>{conversationMessages.message}</div>
                            </li>
                          );
                        }
                      )}
                  </ul>

                  <div className='send-message-container'>
                    <Form
                      // onSubmit={handleSubmit}
                      className='send-message-form'
                    >
                      <FormControl
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        placeholder='Type your message and hit Enter'
                        type='text'
                      ></FormControl>

                      <button className='secondary-btn' onClick={handleSubmit}>
                        Submit
                      </button>
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
