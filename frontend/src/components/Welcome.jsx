import React from 'react'
import robot from '../assets/robot.gif'
import cattus from '../assets/hi.png'
import '../resource/welcome.scss'

const Welcome = ({currentUser}) => {
  return (
    <div className='welcomeContainer'>
        <img src={cattus}alt='welcomeimg'/>
        <h1>
            Welcome,<span> {currentUser.username}</span>
        </h1>
        <h3>
            Select chat to start
        </h3>
    </div>
  )
}

export default Welcome