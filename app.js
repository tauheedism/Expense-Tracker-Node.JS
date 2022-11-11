const path = require("path");

const express = require("express");
const cors = require('cors')
const dotenv=require('dotenv');

const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const userRoutes=require('./routes/user')
const expenseRoutes=require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')

const app = express();

const User=require('./models/user');
const Expense=require('./models/expenseAdd');
const Order=require('./models/orders');


app.use(cors());
dotenv.config();

// app.use(bodyParser.urlencoded({extended:false}));//thsi is for handling forms 
app.use(bodyParser.json());  //this is for handling jsons

app.use(userRoutes);
app.use(expenseRoutes);
app.use('/purchase', purchaseRoutes)


//Associations
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
