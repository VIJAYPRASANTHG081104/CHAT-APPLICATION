import React from 'react'
import axios from 'axios'
import '../resource/powerOff.scss'
import {useNavigate} from 'react-router-dom'
import {BiPowerOff, biPowerOff} from 'react-icons/bi'
const LogOut = () => {
    const navigate = useNavigate();
    const handleclick = () =>{
        localStorage.removeItem('chat-app-user')
        navigate('/login');
    }
  return (
    <div className='powerOff' onClick={handleclick}>
        <BiPowerOff/>
    </div>
  )
}

export default LogOut