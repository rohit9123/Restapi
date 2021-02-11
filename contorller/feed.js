exports.getPosts=(req,res)=>{
        res.status(200).json({posts:[{tittle:'first post',content:'This is the first post: '}]
    })
}

exports.createPost=(req,res)=>{
    const tittle=req.body.tittle;
    const content=req.body.content;
    res.status(201).json({
        message:'post created succesfully',
        post:{id:new Date().toISOString(),tittle:tittle,content:content}
    })
}