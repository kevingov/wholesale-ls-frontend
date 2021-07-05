import "./MessageConvo.css";

import { API } from "aws-amplify";
import React, { Fragment, useEffect, useState, useMemo } from "react";
import ProfileSearchBar from "./ProfileSearchBar";
import MessageBox from "./MessageBox";
import { formatTime } from "../helper/Utils";

export default function MessageConvo({
  openConversation,
  setOpenConversation,
  conversations,
  setConversations,
  allProfiles,
  profiles,
  authedProfile,
}) {
  const [messageBoxes, setMessageBoxes] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [profilesSelected, setProfilesSelected] = useState([]);

  useEffect(() => {
    if (openConversation.conversationId) {
      loadAllMessages(openConversation.conversationId);
    }
  }, [openConversation]);

  const createConversation = async (participantIds) => {
    try {
      const createConvoRes = await API.post(
        "properties",
        `/conversation/createconversation`,
        {
          body: {
            participants: participantIds,
            profileId: ['82f9a180-7383-11eb-a005-6f3c23de9137','f016a3f0-c142-11eb-9327-677faf121733'],
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

  const conversationExists = (participantIds) => {
    return conversations.reduce((existingConvo, convo) => {
      if (convo.participants.equals(participantIds)) return convo;
      return existingConvo;
    }, null);
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
      if (!openConversation && profilesSelected.length > 0) {
        const participantIds = profilesSelected.map(
          (profile) => profile.userId
        );
        participantIds.push(authedProfile.userId);

        // check if conversation already exists with selected participants
        const existingConvo = conversationExists(participantIds);
        if (existingConvo) {
          alert(
            "You already have a conversation opened with the selected participant(s)"
          );
          setOpenConversation(existingConvo);
          return;
        }

        // create conversation
        const newConvo = await createConversation(participantIds);
        console.log("newConvo:", newConvo);
        convoId = newConvo.conversationId;

        setConversations((convos) => [newConvo, ...convos]);
        setOpenConversation(newConvo);
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
      <div className='MessageConvo__Separator' />
      <div className='MessageConvo__CreateConvo'>
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
      </div>
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
