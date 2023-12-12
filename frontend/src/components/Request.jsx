import React, { useState, useEffect } from 'react'
import '../resource/request.scss'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { acceptRoute, rejectRoute } from '../utils/APIRoutes';
import { accepted, rejected } from '../pages/pageValidation/Validate'
const Request = ({ request }) => {
    const [requestArray, setRequestArray] = useState([]);

    useEffect(() => {
        if (request.msg === 'Request received successfully') {
            setRequestArray(request.gettingRequest.request);
        }
    }, [request])
    const handleAccept = async (index) => {
        const accept = await axios.post(acceptRoute, { currentUserId: request.gettingRequest._id, requestedUserId: request.gettingRequest.request[index].from });
        accepted(accept.data);
    }
    const handleReject = async (index) => {
        const reject = await axios.post(rejectRoute, { currentUserId: request.gettingRequest._id, requestedUserId: request.gettingRequest.request[index].from });
        rejected(reject.data);
    }

    return (
        <div className='mainRequestContainer'>
            {request.msg === 'Request received successfully' ?
                requestArray.map((req, index) => {
                    return (
                        <div className='request' key={index}>
                            <img src={req.fromUserAvatar} alt='avatar' />
                            <p style={{ color: "white" }}>{req.fromUserName}</p>
                            <div className='buttons'>
                                <button onClick={() => handleAccept(index)}>Accept</button>
                                <button onClick={() => handleReject(index)}>Reject</button>
                            </div>
                        </div>
                    );
                }) :
                <h1> No Request Found </h1>
            }
            <ToastContainer/>
        </div>
    );
}

export default Request;
