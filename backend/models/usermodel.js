const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:"",
    },
    contact:{
        type:Array,
        default:[]
    },
    request:{
        type:Array,
        default:[]
    }
},{
    timestamps:true
});

const model = mongoose.model("ChatUsers",userSchema);
module.exports = model;