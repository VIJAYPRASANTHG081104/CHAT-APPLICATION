import React, { useEffect, useRef, useState } from 'react'
import '../resource/chatContainer.scss'
import LogOut from './LogOut'
import ChatInput from './ChatInput'
import Messages from './Messages'
import axios from 'axios';
import { getAllMessageRoute, sendMessageRoute } from '../utils/APIRoutes'


function ChatContainer({ currentChat, currentUser,socket }) {
  const scrollRef = useRef();
  const [message, setMessage] = useState([]);
  const [arrivalMessage,setArrialMessage] = useState(null);
  useEffect(() => {
    if (currentChat && currentUser) {
      axios.post(getAllMessageRoute, {
        from: currentUser._id,
        to: currentChat._id
      })
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error("Error fetching messages:", error);
      });
    }
  }, [currentChat, currentUser]);
  
  
  const handleSentMsg = async (msg,isPhoto,displayTime) => {
    const msgSend = await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      messages: msg,
      isPhoto:isPhoto,
      time: displayTime
    });


    //socket connention //
  socket.current.emit('send-msg',{
    to:currentChat._id,
    from:currentUser._id,
    message:msg,
    isPhoto:isPhoto,
    time:displayTime
  });
  const msgs = [...message];
  msgs.push({fromSelf:true,message:msg,isPhoto:isPhoto,time:displayTime});
  setMessage(msgs);
  } 

  useEffect(()=>{
    if(socket.current){
      socket.current.on('msg-recieve',(msg,isPhoto,time)=>{
        setArrialMessage({fromSelf:false,message:msg,isPhoto:isPhoto,time: time});
      })
    }
  },[socket])

  useEffect(()=>{
    arrivalMessage && setMessage((prev) =>[
      ...prev,arrivalMessage
    ]);
  },[arrivalMessage]);


  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:'smooth'});
  },[message]);
  
  return (
    <div className='MainChatContainer'>
      <div className='chat-header'>
        <div className='user-details'>
          <div className='avatar'>
            <img src={currentChat.avatarImage} />
          </div>
          <div className='username'>
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <LogOut />
      </div>
      <Messages scrollRef={scrollRef} message={message}/>
      <ChatInput handleSentMsg={handleSentMsg} />
    </div>
  )
}

export default ChatContainer