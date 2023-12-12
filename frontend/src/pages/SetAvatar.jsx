import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../resource/setAvatar.scss'
import loader from '../assets/loader.gif'
import { toastOptions } from './pageValidation/Validate';
import { setAvatarRoute } from '../utils/APIRoutes';

const SetAvatar = () => {
  const API = 'https://api.multiavatar.com';
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);


  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Select your avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatar[selectedAvatar]
      })
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        navigate('/');
      }
      else {
        toast.error("Error in setting up the avatar", toastOptions);
      }
    }
  }

  

  const fetchData = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      try {
        const response = await axios.get(`${API}/${Math.round(Math.random() * 1000)}`);
        data.push(`data:image/svg+xml;base64,${btoa(response.data)}`);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }
    setAvatar(data);
    setLoading(false);
  };



  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login');
    }
    fetchData();
  }, []);

  return (
    <>
      {
        isLoading ? <div className='setAvatar'>
          <img src={loader} alt='loader' className='loader' />
        </div> : (
          <div className='setAvatar'>
            <div className="title-container">
              <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className="avatars">
              {avatar.map((avatar, index) => (
                <div
                  key={index}
                  className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}
                >
                  <img
                    src={avatar}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              ))}
            </div>
            <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
          </div>
        )
      }
      <ToastContainer />
    </>
  );
};

export default SetAvatar
