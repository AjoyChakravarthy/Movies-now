import React from "react";
import "./PasswordSettings.css";

function PasswordSettings({ className }) {
  return (
    <div className="password-settings className">
      <p>
        Your password must contain at least 6 characters and can’t contain any
        spaces or match your email adress
      </p>
      <form className="password-settings-form">
        <input
          type="password"
          placeholder="Current password"
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="New password"
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          autoComplete="off"
        />
        <button className="save-password">Save password</button>
      </form>
    </div>
  );
}

export default PasswordSettings;
