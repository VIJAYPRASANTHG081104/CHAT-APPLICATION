const messageModel = require('../models/messageModel');
const addMessage = async(req,res) => {
    try {
        const {from,to,messages,isPhoto,time} = req.body;
        const data = await messageModel.create({
            message:{
                text: messages,
                isPhoto:isPhoto,
                time: time
            },
            users:[from,to],
            sender:from
        })
        if(data){
            return res.status(200).send({msg:"message Stored Successfully"});
        }
        return res.status(500).send({err:"Error in Storing the messge in DB"});
    } catch (error) {
        return res.status(500).send({err:"Error in getting the msg"});
    }
}
const getAllMessage = async(req,res) =>{
   
    try {
        const {from,to} = req.body;
        const messages = await messageModel.find({
            users:{
            $all: [ from,to ]
        },
    }).sort({updatedAt: 1});
    // const messages = await messageModel.find({
    //     users:[from,to]
    // }).sort({updatedAt: 1});
    const projectMessage = messages.map((msg)=>{
        // console.log(`${msg.sender.toString()} and ${from}` );
        return {
        fromSelf : msg.sender.toString() === from,
        message:msg.message.text,
        isPhoto:msg.message.isPhoto,
        time:msg.message.time,
    }
    })
    res.json(projectMessage);
    } catch (error) {
        
    }
}
module.exports = {
    addMessage,
    getAllMessage
}