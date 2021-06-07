import "./ProfileSearchBar.css";

import React, { useState } from "react";

export default function ProfileSearchBar({
  profiles,
  profilesSelected,
  setProfilesSelected,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchDropdownExpanded, setSearchDropdownExpanded] = useState(false);

  // User Profile search bar functions
  const onSelectDropdownProfile = (event) => {
    const selectedProfileId =
      event.currentTarget.getAttribute("data-profile-id");
    const selectedProfile = profiles.find(
      (profile) => profile.userId === selectedProfileId
    );

    // Add Profile only if it hasn't been selected
    const hasBeenSelected = profilesSelected.some(
      (profile) => profile.userId === selectedProfile.userId
    );
    if (!hasBeenSelected) {
      setProfilesSelected((profiles) => [...profiles, selectedProfile]);
    }
    setSearchInput("");
    setSearchDropdownExpanded(false);
  };
  const onSearchInputChange = (input) => {
    const { value } = input.target;
    setSearchInput(value);
    if (value.length >= 1) {
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
  const filteredProfiles = (profileData, maxResults) => {
    let count = 0;
    return profileData.filter((profile) => {
      return (
        profile.fullName.toLowerCase().includes(searchInput.toLowerCase()) &&
        count++ < maxResults
      );
    });
  };

  return (
    <div className='Profile-Search-Bar' onBlur={handleOnBlurSearch}>
      <div className='Profile-Search-Bar__Wrapper'>
        <input
          type='text'
          placeholder='Search User'
          value={searchInput}
          onChange={onSearchInputChange}
        />
      </div>
      <div
        className={`Profile-Search-Bar__Dropdown-Content ${
          searchDropdownExpanded ? "active" : ""
        }`}
      >
        {filteredProfiles(profiles, 10).map((item, index) => (
          <a
            onClick={onSelectDropdownProfile}
            data-profile-id={item.userId}
            key={index + " - " + item.userId}
            tabIndex={index}
          >
            {item.fullName}
          </a>
        ))}
      </div>
    </div>
  );
}
