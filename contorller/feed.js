const {validationResult, Result}=require('express-validator/check');
const post = require('../models/post');
const fs=require('fs');
const path=require('path');
const {ObjectId}=require('mongodb')
// const Post=require('../models/post');


exports.getPosts=(req,res,next)=>{
    let page=req.query.page||1;
    let perpage=2,totalitem;
    post.find().countDocuments().then(no=>{
        totalitem=no;
        return post.find().
        skip((page-1)*perpage).limit(perpage)
    }).then(posts=>{
        res.status(200).json({
            message:'fetched',
            posts:posts,
            totalItems:totalitem
        })
    }).catch(err=>{
       if(!err.statusCode){
           err.statusCode=500;
       }
       next(err);
   })
};

exports.createPost=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error=new Error('valdiation failed');
        error.statusCode=422;
       throw (error);
    }
    if(!req.file){
        const error =new Error('no photo find');
        error.statusCode=422;
        throw (error);
    }
    const imageUrl=req.file.path
    const title=req.body.title;
    const content=req.body.content;
    const posts=new post({
        title:title,
            content:content,
            imageUrl:imageUrl,
            creator:{
                name:"rohit"
            },
    });
    posts.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:'Post created',
            post:result
        })
    })
    .catch(err=>{
        // console.log(err);
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
   
}

exports.getPost=(req,res,next)=>{
    const _id=req.params.postId;
    // cons posts=ObjectId(_id);
    // const search=ObjectId(_id);
    console.log(_id);
    
    post.findById(_id).then(
        post=>{
            if(!post){
                const error=new Error('could not find the post') ;
                error.statusCode=404;
                throw (error);
            }
        console.log(post.content,post.title);
        res.status(200).json({message:'post fetched',post:post})
        }).catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.updatePost=(req,res,next)=>{
    const PostId=req.params.postId;
    const title=req.body.title;
    const content=req.body.content;
    let imageUrl=req.body.image;

    if(req.file){
        imageUrl=req.file.path;
    }
    post.findById(PostId).then(post=>{
        if(!post){
            const error=new Error('could not find the post') ;
                error.statusCode=404;
                throw (error);
        }
        if(imageUrl!==post.imageUrl){
            clearImage(post.imageUrl);
        }
        post.title=title;
        post.imageUrl=imageUrl;
        post.content=content;
        return post.save();
    })
    .then(result=>{
        res.status(200).json({post:result});
    })
}

const clearImage=filepath=>{
    filepath=path.join(__dirname,'..',filepath);
    fs.unlink(filepath,err=>console.log(err));
}

exports.deletePost=(req,res,next)=>{
    const postId=req.params.postId;
    post.findById(postId).then(Post=>{
        if(!post){
            const error=new Error('could not find the post') ;
                error.statusCode=404;
                throw (error);
        }
        clearImage(Post.imageUrl);
        return post.findByIdAndRemove(postId)
    }).then(result=>{
        console.log(result);
        res.status(200).json({message:'deleted post'})
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}