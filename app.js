const path = require("path");

const express = require("express");
const cors = require('cors')

const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const userRoutes=require('./routes/user')
const app = express();

const user=require('./models/user')

app.use(cors());

// app.use(bodyParser.urlencoded({extended:false}));//thsi is for handling forms 
app.use(bodyParser.json());  //this is for handling jsons

app.use(userRoutes);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
