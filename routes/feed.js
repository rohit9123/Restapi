const express=require('express');
const feedController=require("../contorller/feed");
const{body}=require('express-validator/check');
const router=express.Router();

router.get('/post',feedController.getPosts);

router.post('/post',[
    body('title').trim().isLength({min:5}),
    body('content').trim().isLength({min:5})
]
,feedController.createPost);


router.get('/post/:postId',feedController.getPost)
router.put('/post/:postId',feedController.updatePost);

module.exports=router;