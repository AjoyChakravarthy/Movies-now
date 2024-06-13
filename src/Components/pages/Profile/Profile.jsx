import React, { useState } from 'react'
import './Profile.css'
import { useAuth } from '../../context/FirebaseContext'
import { useNavigate } from 'react-router-dom';
import ProfileSettings from '../ProfileSettings/ProfileSettings';

function Profile() {
  const [showSettings, setShowSettings] = useState(false);
  const { currentUser, doSignOut } = useAuth();

  const tooggleSettings = () => {
    setShowSettings(!showSettings);
  }
  const navigate = useNavigate();

  const handleLogOut = async () => {

    try {
      console.log('checking')
      await doSignOut();
      navigate('/login');
    } catch (error) {
      console.log("Error signing out", error.message);
    }
  };


  return (
    <div className='profile  '>
      <div className={showSettings ? 'hide' : "user-profile"} >
        <div>
          <h2>{currentUser?.displayName ? currentUser.displayName : 'User'}</h2>
          <p>{currentUser ? currentUser.email : 'Email'}</p>
        </div>
        <div className='profile-circle'>{currentUser?.displayName ? currentUser.displayName.charAt(0) : <i className="fa-solid fa-user-tie"></i>}</div>
      </div>
      <div className="options">
        <button className='profile-btn' onClick={tooggleSettings} disabled={currentUser ? false : true}>{showSettings ? 'Profile' : 'Edit profile'} <i class="fa-solid fa-user"></i></button>
        <button className={showSettings ? 'hide' : ""} disabled={currentUser ? false : true}>Watch List  <i class="fa-solid fa-bookmark"></i></button>
        <button className={showSettings ? 'hide' : ""} onClick={handleLogOut}>{currentUser ? "Log Out" : "Log In"} <i class="fa-solid fa-right-from-bracket"></i></button>
        {showSettings && <ProfileSettings className="profile_overlay" />}
      </div>

    </div>
  )
}

export default Profile
