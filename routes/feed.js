const express=require('express');
const feedController=require("../contorller/feed");
const router=express.Router();

router.get('/post',feedController.getPosts);

router.post('/post',feedController.createPost);


module.exports=router;