import "./MessageBox.css";

import React from "react";
import ProfileIcon from "./ProfileIcon";

export default function MessageBox({ messages, profile, sentAt }) {
  return (
    <div className='MessageBox'>
      <ProfileIcon profile={profile} size='45' />
      <div className='MessageBox__Details'>
        <div>
          <div className='MessageBox__Name-Date'>
            <p className='MessageBox__Name'>{profile.fullName}</p>
            <p>{sentAt}</p>
          </div>
        </div>
        <ul className='MessageBox__Messages'>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
