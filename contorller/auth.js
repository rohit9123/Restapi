const User=require('../models/user');
const {validationResult}=require('express-validator/check');
const bcrypt=require('bcryptjs');

exports.signup=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error=new Error('validation failed');
        error.statusCode=422;
        error.data=errors.array();
        throw error;
    }
    const email=req.body.email;
     const password=req.body.password;
     const name=req.body.name;
     bcrypt.hash(password,12).then(
         hashedPw=>{
             const user=new User({
                 email:email,
                 password:password,
                 name:name,
                 status:'i am new'
             })
             return user.save();
         }
     ).then(result=>{
         console.log(result)
         res.status(201).json({message:'user created',userId:result._id})
     })

}