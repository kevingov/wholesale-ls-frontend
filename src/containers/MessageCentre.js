import "./MessageCentre.css";

import { API, Auth } from "aws-amplify";
import { Breadcrumb } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import ConvoCard from "../components/ConvoCard";
import MessageConvo from "../components/MessageConvo";
import createConvoIcon from "../assets/create-icon.png";

export default function MessageCentre(props) {
  const [authedProfile, setAuthedProfile] = useState("");
  const [allProfiles, setAllProfiles] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [openConversation, setOpenConversation] = useState({});

  useEffect(() => {
    loadAuthedProfile();
    listConversation();
    listProfiles();
  }, []);

  const loadAuthedProfile = async () => {
    try {
      const user = await Auth.currentUserInfo();
      let userId = "none";
      if (user) userId = user["id"];
      const profileRes = await API.get("profiles", `/profiles/${userId}`);
      setAuthedProfile(profileRes);
    } catch (err) {
      console.log("loadAuthedProfile:", err);
    }
  };

  const listConversation = async () => {
    try {
      const convosRes = await API.get("properties", `/listconversation`);
      setConversations(convosRes);
      setOpenConversation(convosRes[0]);
    } catch (err) {
      console.log("listConversation:", err);
    }
  };

  const listProfiles = async () => {
    try {
      const profilesRes = await API.get("profiles", `/listprofile`);
      setAllProfiles(profilesRes);
      console.log("allProfiles:", profilesRes);
    } catch (err) {
      console.log("listProfiles:", err);
    }
  };

  const openCreateConvoScreen = () => {
    setOpenConversation(null);
  };

  return (
    <div className='Index'>
      <div className='Breadcrumbs'>
        <div className='Breadcrumbs-items container'>
          <Breadcrumb>
            <Breadcrumb.Item active>Conversations</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <div className='MessageCentre'>
        <div className='MessageCentre__Container'>
          <div className='MessagePanel'>
            <div className='MessagePanel__Head'>
              <h3 style={{ margin: 0 }}>
                Messages
                {conversations.length > 0 && ` (${conversations.length})`}
              </h3>
              <img
                src={createConvoIcon}
                alt='Create Conversation Icon'
                onClick={openCreateConvoScreen}
              />
            </div>
            <div className='MessagePanel__Convo-List'>
              {allProfiles &&
                conversations.map((convo, index) => {
                  const profiles = allProfiles.filter((profile) =>
                    convo.participants.includes(profile.userId)
                  );
                  return (
                    <ConvoCard
                      key={convo.conversationId}
                      conversation={convo}
                      isSelected={
                        openConversation &&
                        convo.conversationId === openConversation.conversationId
                      }
                      setOpenConversation={setOpenConversation}
                      profiles={profiles}
                    />
                  );
                })}
            </div>
          </div>
          {allProfiles && (
            <MessageConvo
              openConversation={openConversation}
              setOpenConversation={setOpenConversation}
              setConversations={setConversations}
              allProfiles={allProfiles}
              authedProfile={authedProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
}
