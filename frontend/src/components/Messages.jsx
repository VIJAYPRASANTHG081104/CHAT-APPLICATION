import React from 'react'
import '../resource/message.scss'
import {v4 as uuidv4} from 'uuid';
const Messages = ({ message,scrollRef }) => {
  return (
    <div className='chat-messages'>
      {
        message.map((msg) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
            {
              msg.isPhoto === false?
              <div className={`message ${msg.fromSelf ? "sended" : "received"}`}>
                <div className='content'>
                <span>{msg.time}</span>
                  <p>
                    {msg.message}
                  </p>
                </div>
              </div>:
              <div className={`message ${msg.fromSelf ? "sended" : "received"}`}>
                <div className='content'>
                <span>{msg.time}</span>
                  <img  src={msg.message} alt='sendphoto'/>
                </div>
              </div>
            }
            </div>
          )
        })
      }
    </div>
  )
}

export default Messages