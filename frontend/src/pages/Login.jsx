import React, { useState,useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Logo from '../assets/logo.svg'
import '../resource/Register.scss'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {handleValidationLogin, registerResponesValidate} from './pageValidation/Validate'
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'


const Login = () => {
  
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  },[])

  const navigate = useNavigate();
  const [values,setValues] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = async(event) =>{
    event.preventDefault();
    if(handleValidationLogin(values)){
      const {password,username} = values;
      const {data} = await axios.post(loginRoute,{
        username,
        password
      })
      if(registerResponesValidate(data)){
        navigate('/');
      }
    }
  }

  const handleChange=(event)=>{
    setValues({...values,[event.target.name]: event.target.value})
  }
  return (
    <div className='form'>
      <form onSubmit={(event)=>handleSubmit(event)}>
        <div  className='brand'>
          <img src={Logo} alt=''/>
          <h1>Vchat</h1>
        </div>
        <input 
        type='text' 
        placeholder='Username' 
        name='username' 
        onChange={(e)=>handleChange(e)}
        />
        <input 
        type='password' 
        placeholder='Password' 
        name='password' 
        onChange={(e)=>handleChange(e)}
        />
        <button type='submit'>Create User</button>
      </form>

      <span>Don't have a account? <Link to={'/register'}>Register</Link></span>
      <ToastContainer/>
    </div>
    
  )
}
export default Login