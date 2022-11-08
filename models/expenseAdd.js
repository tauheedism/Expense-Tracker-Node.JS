const Sequelize = require ('sequelize')
const sequelize = require('../util/database')
const AddExpense = sequelize.define('addexpense',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement : true,
    allowNull:false,
    primaryKey:true
  },
  name:Sequelize.INTEGER,
  des:Sequelize.STRING,
  categ:Sequelize.STRING
})

module.exports=AddExpense;

// const Sequelize = require("sequelize");
// const  sequelize  = require("../util/database");

// const Expense = sequelize.define('Expenses',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//    name :{
//         type:Sequelize.INTEGER,
//         allowNull:false
//     },
//     des:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     categ:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })

// module.exports = Expense