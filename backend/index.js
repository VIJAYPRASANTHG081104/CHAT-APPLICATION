const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes')
const messagesRoute = require('./routes/messagesRoute')
const requestRoute = require('./routes/requestRoute');
const resToReqRoute = require('./routes/resForReqRouter') 
const socket = require('socket.io');



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({limit:'10mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
PORT = process.env.PORT || 5000


mongoose.connect("mongodb+srv://vijayprasanth08112004:chatapp@chat-app.diw7i4y.mongodb.net/")
mongoose.connection.on("connected",()=>{
    console.log("DB SUCCESS")
})
mongoose.connection.on("error",()=>{
    console.log("DB FAILED")
})

app.use("/api/auth",userRoutes);
app.use("/api/messages",messagesRoute);
app.use("/api/request",requestRoute)
app.use('/api/restoreq',resToReqRoute);


const server = app.listen(PORT,()=>{
    console.log(`THE SERVER IS RUNNING IN THE PORT ${PORT}`)
})

const io = socket(server,{
    cors:{
    origin:"http://localhost:3000",
    }
});

global.onlineUsers = new Map();

io.on('connection',(socket)=>{
    socket.on('add-user',(userId)=>{
        onlineUsers.set(userId,socket.id);
    })

    socket.on("send-msg",(data)=>{
        console.log(data);
        const sendUserSocket =  onlineUsers.get(data.to);
        if(sendUserSocket){
            console.log(sendUserSocket)
            socket.to(sendUserSocket).emit('msg-recieve',data.message,data.isPhoto,data.time);
        }
    });
})
