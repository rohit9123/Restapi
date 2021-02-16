const express=require('express');
const router=express.Router();
const authController=require('../contorller/auth');
const{body}=require('express-validator/check');
const user = require('../models/user');

router.put('/signup',
body('email').isEmail()
.custom((value,{req})=>{
    return user.findOne({email:value}).then(userDoc=>{
        if(userDoc){
            return Promise.reject('Email already exsist');
        }
    })
}).normalizeEmail(),
body('password').trim().isLength({min:5}),
body('name').trim().isLength({min:3})

,authController.signup)


module.exports=router;