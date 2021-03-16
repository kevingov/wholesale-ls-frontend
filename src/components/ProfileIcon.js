import React from "react";
import config from "../config";

import defaultAvatarIcon from "../assets/avatar-icon.png";

const ProfileIcon = ({ profile, size }) => {
  const src =
    profile && profile.image
      ? `https://${config.s3.BUCKET}.s3.amazonaws.com/public/${profile.image}`
      : defaultAvatarIcon;
  const diameter = size + "px";

  return (
    <img
      className='ProfilePicture'
      alt='Profile avatar image'
      src={src}
      style={{
        borderRadius: "50%",
        border: "5px solid #efefef",
        width: diameter,
        height: diameter,
        objectFit: "cover",
      }}
    />
  );
};

export default ProfileIcon;
