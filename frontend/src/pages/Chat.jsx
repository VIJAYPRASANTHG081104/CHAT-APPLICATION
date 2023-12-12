import React, { useEffect, useState, useRef} from 'react'
import '../resource/chat.scss'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute,host } from '../utils/APIRoutes';
import axios from 'axios';
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'


const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('chat-app-user')) || '');
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    }
  }, []);

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])

  const MIN = 3000
  useEffect(() => {
    const interval = setInterval(()=>{
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          
          axios.get(`${allUsersRoute}/${currentUser._id}`)
            .then(response => {
              setContacts(response.data);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        } else {
          navigate('/setAvatar');
        }
      }
    },MIN)
    return () => clearInterval(interval);
  },[])
    

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <div className='mainContainer'>
      <div className="container">
        <Contact contacts={contacts} 
        currentUser={currentUser} 
        changeChat={handleChatChange} 
        />
        {
          currentChat === undefined ?
            <Welcome currentUser={currentUser} /> :
            <ChatContainer 
            currentChat={currentChat} 
            currentUser={currentUser}
            socket = {socket}
            />
        }
      </div>
    </div>
  )
}

export default Chat