const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    message: {
        text: {
            type: String,
            required: true,
        },
        isPhoto:{
            type:Boolean
        },
        time:String
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    {
        timestamps: true
    }
)
const messageModel = mongoose.model('messageModel', messageSchema);
module.exports = messageModel