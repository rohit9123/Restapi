const mongoose=require('mongoose');
const { schema } = require('./post');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    status:{
        type:String,
        require:true
    },
    posts:[{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }]
})

module.exports=mongoose.model('User',userSchema);