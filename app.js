const path = require("path");

const express = require("express");
const cors = require('cors')
const dotenv=require('dotenv');

const bodyParser = require("body-parser");


// Backend Routes
const sequelize = require("./util/database");
const userRoutes=require('./routes/user')
const expenseRoutes=require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const resetPasswordRoutes = require('./routes/resetpassword');
const app = express();

// Models
const User=require('./models/user');
const Expense=require('./models/expenseAdd');
const Order=require('./models/orders');
const Forgotpassword = require('./models/forgotpassword');


app.use(cors());
dotenv.config();

// app.use(bodyParser.urlencoded({extended:false}));//thsi is for handling forms 
app.use(bodyParser.json());  //this is for handling jsons

// Frontend routes
app.use(userRoutes);
app.use(expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/password', resetPasswordRoutes);



//Associations
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
