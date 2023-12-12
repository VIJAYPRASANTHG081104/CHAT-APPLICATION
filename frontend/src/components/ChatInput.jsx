import React, { useState } from 'react'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'
import '../resource/chatInput.scss'
import { base64 } from '../utils/base64'
import axios from 'axios';
import { Button, Dropdown } from 'antd';

const ChatInput = ({handleSentMsg}) => {

  const time = new Date();
  const displayTime = time.toUTCString().slice(0,25);
  const items = [
  {
    key: '1',
    label: (
    <label htmlFor="imageicon">
  <input type="file" id="imageicon" name="file" style={{ display: 'none' }} onChange={(e)=>convertBase64(e)}/>
  <i className="fa-solid fa-image"></i>
</label>

    ),
  },
  {
    key: '2',
    label: (
      <label htmlFor="fileicon">
      <input type="file" id="fileicon" name="file" style={{ display: 'none' }} onChange={(e)=>convertBase64(e)}/>
      <i className="fa-solid fa-file"></i>
    </label>
    ),
  },
]
  const [showEmojiPicker,setShowEmojiPicker] = useState(false);
  const [msg,setmsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  };
  const handleEmojiClick = (emojiObject,event) =>{
    setmsg((prev)=> prev+emojiObject.emoji)
  }
  const sendChat = (event,result) => {
    event.preventDefault();
    if(msg.length>0){
      handleSentMsg(msg, false, displayTime);
      setmsg('');
    }
    if(result){
      handleSentMsg(result, true, displayTime);
    }
  }
  const convertBase64 = async(e) =>{
    const result = await base64(e.target.files[0]);
    sendChat(e,result);
  }
  return (
    <div className='ChatInputContainer'>
      <div className='button-container'>
        <div className='emoji'>
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
          {
            showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
          }
        </div>
        <div className='fileInput'>
        <Dropdown
        menu={{
          items,
        }}
        placement="top"
      >
        <Button><i className="fa-solid fa-paperclip"></i></Button>
      </Dropdown>
        </div>
      </div>
      <form className='input-container' onSubmit={(e)=>sendChat(e)}>
        <input type='text' placeholder='type a message' value={msg} onChange={(e)=>setmsg(e.target.value)}/>
        <button className='submit'>
          <IoMdSend/>
        </button>
      </form>
    </div>

  )
}

export default ChatInput