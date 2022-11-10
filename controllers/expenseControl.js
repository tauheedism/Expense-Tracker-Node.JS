const { response } = require("express");
const Expense = require("../models/expenseAdd");


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
   return res.status(200).json({response,success:true})
  })
  .catch(err=>{
    return res.status(500).json({err,success:false})})
  }
  
  exports.delete=(req,res,next)=>{
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