const model = require('../models/usermodel');

const acceptRequest = async(req,res) =>{
try {
    const {currentUserId,requestedUserId} = req.body;
    const findUser1 = await model.findById({_id:requestedUserId}).select([
        'avatarImage',
        '_id',
        'username'
    ])
    const update1 = await model.findByIdAndUpdate({_id:currentUserId},{
        $push : {contact:findUser1},
        $pull: {request:{from:requestedUserId}}
    })
    const findUser2 = await model.findById({_id:currentUserId}).select([
        'avatarImage',
        '_id',
        'username'
    ])
    const update2 = await model.findByIdAndUpdate({_id:requestedUserId},{
        $push : {contact:findUser2}
    })
    return res.status(200).send({msg:"Added successfully"});
} catch (error) {
    return res.send({err:"Can't add user"});
}
}
const rejectRequest = async(req,res) =>{
    try {
        const {currentUserId,requestedUserId} = req.body;
        const findUser = await model.findByIdAndUpdate({_id:currentUserId},{
            $pull:{request:{from:requestedUserId}}
        })
        return res.status(200).send({msg:"Removed successfully"});
    } catch (error) {
        return res.send({msg:"Can't remove the Request"});
    }
}

module.exports = {
    acceptRequest,
    rejectRequest
}