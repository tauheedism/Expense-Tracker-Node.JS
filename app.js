const path = require("path");

const express = require("express");
const cors = require('cors')

const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const userRoutes=require('./routes/user')
const expenseRoutes=require('./routes/expense')


const app = express();

const User=require('./models/user');
const Expense=require('./models/expenseAdd')

app.use(cors());

// app.use(bodyParser.urlencoded({extended:false}));//thsi is for handling forms 
app.use(bodyParser.json());  //this is for handling jsons

app.use(userRoutes);
app.use(expenseRoutes);

//Associations
User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
