const model = require('../models/usermodel')
const searchcontact = async (req, res) => {
    const { search,currentUserName } = req.body;
    try {
        const users = await model.find({
            username: {
                $regex: search,
                $ne:currentUserName
            }
        }).select([
            'username',
            '_id'
            , 'avatarImage',]);
        if (users.length < 0) {
            console.log('not found');
        }
        else {
            return res.status(200).send(users)
        }

    } catch (error) {
        return res.status(500).send({ error: "Can't search error in catch" })
    }
}
const requestFriend = async (req, res) => {
    const REQUEST_NOT_EXIST = 1;
    const REQUEST_ALREADY_EXIST = 0;
    let flag = REQUEST_NOT_EXIST;

    try {
        const { to, from, toUserName, fromUserName, fromUserAvatar } = req.body;
        const alreadyExist = await model.findById({ _id: to });
        const length = alreadyExist.request.length;
        let flag = REQUEST_NOT_EXIST;
        for (let i = 0; i < length; i++) {
            if (alreadyExist.request[i].fromUserName === fromUserName) {
                flag = REQUEST_ALREADY_EXIST;
                break;
            }
        }
        const Length = alreadyExist.contact.length;
         for (let i = 0; i < Length; i++) {
            if (alreadyExist.contact[i].username === fromUserName) {
                flag = REQUEST_ALREADY_EXIST;
                break;
            }
        }
        if (flag === REQUEST_NOT_EXIST) {
            console.log('i am running A');
            const requestToAppend = {
                from: from,
                fromUserName: fromUserName,
                fromUserAvatar: fromUserAvatar,
            };

            await model.findByIdAndUpdate({ _id: to }, {
                $push: { request: requestToAppend },
            });
            return res.status(200).send({ msg: "Request sent successfully" });
        } else {
            console.log('i am running B');
            return res.status(200).send({ msg: "Request already sent" });
        }

    } catch (error) {
        return res.status(500).send({ err: "Can't give frined request" })
    }
}
const getRequest = async (req, res) => {
    // console.log("gege")
    const { _id } = req.body;
    console.log(_id);
    try {
        const gettingRequest = await model.findById({ _id: _id }).select(
            'request'
        );
        if (gettingRequest.request.length > 0) {
            return res.status(200).send({ msg: "Request received successfully", gettingRequest })
        }
        else {
            return res.status(200).send({ NoRequestMsg: 'No Request Found' });
        }
    } catch (error) {

    }
}

module.exports ={
    searchcontact,
    requestFriend,
    getRequest,
}