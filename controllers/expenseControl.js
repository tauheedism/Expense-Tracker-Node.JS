const { response } = require("express");
const Expense = require("../models/expenseAdd");
const User=require("../models/user");
const Sequelize=require('sequelize');
const op = Sequelize.Op;

exports.addExpenses =((req,res,next)=>{
    const{name,des,categ}=req.body
   console.log(name,des,categ)
   Expense.create({name,des,categ,ExpenseUserId:req.user.id})
  // req.user.createExpense({name,des,categ})
    .then((response)=>{
      res.status(201).json({data:response})
    })
    .catch(err=>res.status(500).json({err}))
  })
  
  exports.getExpenses =(req,res,next)=>{
    // Expense.findAll()

    Expense.findAll({where:{ExpenseUserId:req.user.id}})
    // req.user.getExpenses()
  .then(response=>{
   return res.status(200).json({response,user:req.user})
  })
  .catch(err=>{
    return res.status(500).json({err,success:false})})
  }
  
  exports.deleteDetails=(req,res,next)=>{
  const id = req.params.id;
  // Expense.destroy({where:{id:id}})
  Expense.destroy({where:{id:id,ExpenseUserId:req.user.id}})
  .then((noOfRows)=> {
    if (noOfRows===0) {
     return res.status(404).json({success:false,message:'Expense does not belong to user'})
    }
    return res.status(200).json({success:true,message:'successful'})})
      .catch(err=>{console.log(err)})
  }

  exports.getAllUsers = (req,res)=>{
    User.findAll()
     .then(result=>{
       return res.status(201).json({success:true , data:result})
     })
     .catch(err =>{
       return res.status(500).json({success:false , message:"failed"})
     })
}

exports.getAllExpenses = (req,res)=>{
   const userid = req.params.id
   Expense.findAll({where:{ExpenseUserId:userid}})
   .then(result=>{
       return res.status(201).json({success:true , data:result})
   })
   .catch(err =>{
       return res.status(500).json({success:false , data:err})
   })
}