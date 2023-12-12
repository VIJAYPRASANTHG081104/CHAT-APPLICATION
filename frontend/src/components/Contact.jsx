import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.svg'
import '../resource/contact.scss'
import axios from 'axios';
import { searchContactRoute, getFriendRequest } from '../utils/APIRoutes';
import Search from './search';
import ContactList from './ContactList';
import Request from './Request';


const Contact = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [search, setSearch] = useState("");
  const [getSearch, setGetSearch] = useState();
  const [request, setRequest] = useState({ msg: 'No request' });
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contacts) => {
    setCurrentSelected(index);
    changeChat(contacts);
  };
  const handleSearch = async (e) => {
    setSearch(e.target.value);
    const getSearchContact = await axios.post(searchContactRoute, { search: e.target.value, currentUserName: currentUserName })
    setGetSearch(getSearchContact.data);
  }

  const MINUTE_MS = 10000;
  useEffect(() => {
    const interval = setTimeout(() => {
      console.log('searching for the request');
      axios.post(getFriendRequest, { username: currentUser.username, _id: currentUser._id })
        .then(response => {
          setRequest(response.data)
        })
    }, MINUTE_MS);
    return () => clearInterval(interval);
  },)
  const [toggle,setToggle] = useState(1);
  const handleChangeComponent = (toggle) =>{
    setToggle(toggle === 1?0:1)
  }
  return (
    <>
      {currentUserImage && currentUserName && (
        <div className={`contactsMainContainer ${search.length > 0 ? "changeTheGrid" : ""}`}>
          <div className='brand'>
            <img src={Logo} alt='logo' />
            <h3>Vchat</h3>
          </div>
          <div className={`searchfrd ${search.length > 0 ? "gridShow" : ""}`}>
            <form>
              <input onChange={(e) => handleSearch(e)} placeholder='search your frnd' className='search' type='text' />
            </form>
            <div className={`displaySearch ${search.length > 0 ? "display" : "noDisplay"}`}>
              <Search currentUser={currentUser} getSearch={getSearch} />
            </div>
          </div>
          <div className='contacts'>
            {toggle?<ContactList
              currentSelected={currentSelected}
              changeCurrentChat={changeCurrentChat}
              contacts={contacts}
            />:<Request request={request}/>}
          </div>
          <div className='current-user'>
            <div className='avatar'>
              <img src={currentUserImage} alt='avatar' />
            </div>
            <div className='username'>
              <h2>{currentUserName}</h2>
            </div>
            <div className='ghost'>
              <i onClick={()=>handleChangeComponent(toggle)} className={`fa-solid fa-ghost ${request.msg === 'Request received successfully' ? 'fa-bounce' : ''}`}></i>
            </div>
          </div>
        </div>
      )}
    </>

  )
}

export default Contact