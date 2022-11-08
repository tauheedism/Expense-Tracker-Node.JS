const Expense = require("../models/expenseAdd");


exports.addExpenses =((req,res,next)=>{
    const{name,des,categ}=req.body
   console.log(name,des,categ)
   Expense.create({name,des,categ})
    .then((response)=>{
      res.status(201).json({data:response})
    })
    .catch(err=>res.status(500).json({err}))
  })
  
  exports.getExpenses =(req,res,next)=>{
    Expense.findAll()
  .then(response=>{
   res.status(200).json({response})
  })
  .catch(err=> res.status(500).json(err))
  }
  
  exports.delete=(req,res,next)=>{
  const id = req.params.id;
  Expense.destroy({where:{id:id}})
  .then(response=> res.status(200).json({msg:'successful'}))
      .catch(err=>{console.log(err)})
  }