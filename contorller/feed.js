const {validationResult, Result}=require('express-validator/check');
const Post=require('../models/post');
exports.getPosts=(req,res)=>{
        res.status(200).json({
        
        posts:[{
        _id:"12",
        title:'first post',
        content:'This is the first post: ',
    
        imageUrl:'image/naruto.jpg',
        creator:{
            name:"Rohit"
        },
        createdAt:new Date()
    }]
    })
};

exports.createPost=(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message:"validation failed",errors:errors.array()});
    }
    const title=req.body.title;
    const content=req.body.content;
    const post=new Post({
        title:title,
            content:content,
            imageUrl:"images/naruto.jpg",
            creator:{
                name:"rohit"
            },
    });
    post.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:'Post created',
            post:result
        })
    })
    .catch(err=>{
        console.log(err);
    })
   
}