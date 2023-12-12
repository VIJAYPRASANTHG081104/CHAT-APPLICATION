import React, { useState } from 'react';
import axios from 'axios'
import {toCheckAllreadyExist} from '../pages/pageValidation/Validate'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { requestRoute } from '../utils/APIRoutes';
const Search = ({ getSearch, currentUser }) => {

    const [heartColors, setHeartColors] = useState(getSearch > 0 ? Array(getSearch.length).fill('') : '');
    const [allready,setAllready] = useState();
    const changeColor = async (index, _id, username) => {
        // setHeartColors((prevColors) => {
        //     const newColors = [...prevColors];
        //     console.log(newColors)
        //     newColors[index] = newColors[index] === 'red' ? '' : 'red';
        // });
        const request = await axios.post(requestRoute, {
            to: _id,
            toUserName: username,
            from: currentUser._id,
            fromUserName: currentUser.username,
            fromUserAvatar: currentUser.avatarImage
        });
        toCheckAllreadyExist(request.data)
    };
        
    return (
        <div>
            {getSearch && getSearch.length > 0 ? (
                getSearch.map((con, index) => (
                    <div className='results' key={index}>
                        <img src={con.avatarImage} alt='userImage' />
                        <p>{con.username}</p>
                        <i
                            className="fa-regular fa-heart"
                            //   style={{ color: heartColors[index] }}
                            onClick={() => changeColor(index, con._id, con.username)}
                        ></i>
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
            <ToastContainer/>
        </div>
    );
};

export default Search;
