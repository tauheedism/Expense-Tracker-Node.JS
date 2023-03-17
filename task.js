const express=require('express');
const app=express();
app.post('api/login',function(req,res){
    const {email,password}=req.body;
    res.json({user})
})

app.post('api/signup',function(req,res){
    
})