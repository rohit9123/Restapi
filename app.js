const express=require("express");
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const feedRoutes=require('./routes/feed');


mongoose.connect("mongodb+srv://Rohit:rohit143@cluster0.ywnv8.mongodb.net/restapi",{useNewUrlParser:true,useUnifiedTopology:true});
app.use(bodyParser.json()) //aplication/json

//for cors
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers',"Content-Type,Authorization");
    next();

});
app.use('/feed',feedRoutes);



app.listen(8080,()=>{
    console.log('start');
});