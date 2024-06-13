import React, { useState } from "react";
import "./ProfileSettings.css";
import { useAuth } from "../../context/FirebaseContext";
import PasswordSettings from "../PasswordSettings/PasswordSettings";

function ProfileSettings({ className }) {
  const { currentUser } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const toggleSettings = () => {
    setShowChangePassword(!showChangePassword);
  };
  return (
    <div className="profile-settings className">
      <div className="settings">
        <p
          className="toggle"
          onClick={toggleSettings}
        >
          {showChangePassword ? "Edit profile" : "Change password"}
        </p>
      </div>
      {showChangePassword && <PasswordSettings className="profile_overlay" />}
      <div className={showChangePassword ? "hide" : " edit-details"}>
        <div className="profile-circle">
          {currentUser?.displayName ? (
            currentUser.displayName.charAt(0)
          ) : (
            <i className="fa-solid fa-user-tie"></i>
          )}
        </div>
        <input
          type="text"
          placeholder={
            currentUser?.displayName ? currentUser.displayName : "User"
          }
        />
        <input
          type="email"
          placeholder={currentUser ? currentUser.email : "Email"}
        />
        <button className="save">Save profile</button>
      </div>
    </div>
  );
}

export default ProfileSettings;
