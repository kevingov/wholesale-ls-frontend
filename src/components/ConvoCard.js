import "./ConvoCard.css";

import React from "react";
import ProfileIcon from "./ProfileIcon";
import { formatDate, formatTime } from "../helper/Utils";

export default function ConvoCard({
  conversation,
  isSelected,
  setOpenConversation,
  profiles,
}) {
  const participantProfiles = profiles.filter((profile) =>
    conversation.participants.includes(profile.userId)
  );
  const participantNames = participantProfiles
    .map((profile) => profile.fullName)
    .join(", ");

  const lastMessage = "";
  return (
    <div
      className={`ConvoCard ${isSelected ? " selected" : ""}`}
      onClick={() => setOpenConversation(conversation)}
    >
      <ProfileIcon profile={profiles[0]} size='50' />
      <div className='ConvoCard__Details'>
        <div>
          <div className='ConvoCard__Names-Date'>
            <p className='ConvoCard__Names'>{participantNames}</p>
            <p>{formatDate(conversation.createdAt)}</p>
          </div>
        </div>
        <p className='ConvoCard__Preview'>{lastMessage}</p>
      </div>
    </div>
  );
}
