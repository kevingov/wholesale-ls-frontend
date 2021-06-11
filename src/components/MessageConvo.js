import "./MessageConvo.css";

import { API } from "aws-amplify";
import React, { Fragment, useEffect, useState, useMemo } from "react";
import ProfileSearchBar from "./ProfileSearchBar";
import MessageBox from "./MessageBox";
import { formatTime } from "../helper/Utils";

export default function MessageConvo({
  openConversation,
  setOpenConversation,
  setConversations,
  allProfiles,
  profiles,
  authedProfile,
}) {
  const [messageBoxes, setMessageBoxes] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [profilesSelected, setProfilesSelected] = useState([]);

  useEffect(() => {
    if (openConversation) {
      loadAllMessages(openConversation.conversationId);
    }
  }, [openConversation]);

  const createConversation = async () => {
    try {
      const participantIds = profilesSelected.map((profile) => profile.userId);
      participantIds.push(authedProfile.userId);
      const createConvoRes = await API.post(
        "properties",
        `/conversation/createconversation`,
        {
          body: {
            participants: participantIds,
          },
        }
      );
      console.log("convoCreated:", createConvoRes);
      return createConvoRes;
    } catch (err) {
      console.log("convoCreated:", err);
    }
  };

  const loadAllMessages = async (conversationId) => {
    try {
      const allMessages = await API.get(
        "properties",
        `/conversation/getmessages`,
        {
          queryStringParameters: {
            conversationId: conversationId,
          },
        }
      );

      const composeMessageBoxes = allMessages.reduce((res, msg) => {
        createMsgBoxes(res, msg);
        return res;
      }, []);

      setMessageBoxes(composeMessageBoxes);
    } catch (err) {
      console.log("loadAllMessages:", err);
    }
  };

  const createMessage = async (conversationId, authedUser, message) => {
    try {
      const createMessageRes = await API.post(
        "properties",
        `/conversation/createmessage`,
        {
          body: {
            propertyOwner: authedUser.userId,
            content: message,
            conversationId,
            senderName: authedUser.fullName,
          },
        }
      );
      console.log("messageCreated:", createMessageRes);
      setMessageInput("");
      return createMessageRes;
    } catch (err) {
      console.log("messageCreated:", err);
    }
  };

  const createMsgBoxes = (msgBoxes, newMsg, isNewConvo) => {
    if (isNewConvo) msgBoxes = [];
    const latestMsgBox = msgBoxes.length ? msgBoxes[msgBoxes.length - 1] : null;

    if (latestMsgBox && latestMsgBox.userId === newMsg.userId) {
      latestMsgBox.messages.push(newMsg.message);
      latestMsgBox.sentAt = newMsg.createdAt;
    } else {
      let newMsgBox = {
        userId: newMsg.userId,
        sentAt: newMsg.createdAt,
        messages: [newMsg.message],
      };
      msgBoxes.push(newMsgBox);
    }
    return msgBoxes;
  };

  const onSendMessage = async () => {
    if (!messageInput || !authedProfile) return;
    let convoId;
    let isNewConvo = false;

    try {
      // create conversation
      if (!openConversation && profilesSelected.length > 0) {
        const convoCreated = await createConversation(profilesSelected);
        console.log("convoCreated:", convoCreated);
        convoId = convoCreated.conversationId;

        setConversations((convos) => [convoCreated, ...convos]);
        setOpenConversation(convoCreated);
        setProfilesSelected([]);
        isNewConvo = true;
      }
      // create message
      convoId = openConversation ? openConversation.conversationId : convoId;
      const msgCreated = await createMessage(
        convoId,
        authedProfile,
        messageInput
      );

      const updatedMsgsBoxes = createMsgBoxes(
        messageBoxes,
        msgCreated,
        isNewConvo
      );
      console.log("updatedMsgsBoxes:", updatedMsgsBoxes);
      setMessageBoxes([...updatedMsgsBoxes]);
    } catch (err) {
      console.log("onSendMessage:", err);
    }
  };

  const participantNames = () => {
    if ("participants" in openConversation && profiles) {
      return Object.entries(profiles)
        .filter(
          ([userId, _]) =>
            openConversation.participants.includes(userId) &&
            userId !== authedProfile.userId
        )
        .map(([_, profile]) => {
          if (profile.userId !== authedProfile.userId) return profile.fullName;
        })
        .join(", ");
    }
  };

  const onMessageInputChange = (input) => {
    const { value } = input.target;
    setMessageInput(value);
  };

  const MessageConvoCreate = () => (
    <Fragment>
      <div className='MessageConvo__Head'>
        <h3>Participants Selected</h3>
      </div>
      <div className='MessageConvo__Users'>
        {profilesSelected.map((profile, index) => (
          <div key={profile.userId} className='MessageConvo__Selected-User'>
            {profile.fullName}
          </div>
        ))}
      </div>
      <ProfileSearchBar
        profiles={allProfiles}
        profilesSelected={profilesSelected}
        setProfilesSelected={setProfilesSelected}
      />
      {profilesSelected.length > 0 && (
        <button
          className='secondary-btn'
          onClick={() => setProfilesSelected([])}
        >
          Clear Selected
        </button>
      )}
    </Fragment>
  );

  return (
    <div className='MessageConvo'>
      {openConversation ? (
        <Fragment>
          <div className='MessageConvo__Head'>
            {<h3 style={{ margin: 0 }}>{participantNames()}</h3>}
          </div>
          <div className='MessageConvo__Separator' />
          <div className='MessageConvo__Messages'>
            {messageBoxes &&
              messageBoxes.map((msgBox, index) => {
                console.log("msgBox:", msgBox);
                return (
                  <MessageBox
                    key={("Message Box", index)}
                    profile={profiles[msgBox.userId]}
                    sentAt={formatTime(msgBox.sentAt)}
                    messages={msgBox.messages}
                  />
                );
              })}
          </div>
        </Fragment>
      ) : (
        MessageConvoCreate()
      )}
      <div className='MessageConvo__Input-Container'>
        <textarea value={messageInput} onChange={onMessageInputChange} />
        <button className='secondary-btn' onClick={onSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
