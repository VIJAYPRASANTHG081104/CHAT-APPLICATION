import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Logo from '../assets/logo.svg'
import '../resource/Register.scss'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {handleValidationRegister, registerResponesValidate} from './pageValidation/Validate'
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'


const Register = () => {
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  },[])
  const navigate = useNavigate();
  const [values,setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async(event) =>{
    event.preventDefault();
    if(handleValidationRegister(values)){
      const {password,username, email} = values;
      const {data} = await axios.post(registerRoute,{
        username,
        email,
        password
      })
      const nav = registerResponesValidate(data)
      if(nav){
        setTimeout(navigate('/'),3000);
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
        type='email' 
        placeholder='Email' 
        name='email' 
        onChange={(e)=>handleChange(e)}
        />
        <input 
        type='password' 
        placeholder='Password' 
        name='password' 
        onChange={(e)=>handleChange(e)}
        />
        <input 
        type='password' 
        placeholder='Confirm Password' 
        name='confirmPassword' 
        onChange={(e)=>handleChange(e)}
        />
        <button type='submit'>Create User</button>
      </form>

      <span>already have a account? <Link to={'/login'}>Login</Link></span>
      <ToastContainer/>
    </div>
    
  )
}
export default Register