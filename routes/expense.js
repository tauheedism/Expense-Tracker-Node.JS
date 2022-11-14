const express = require('express');

const userAuthentication = require('../middleware/auth')

const router = express.Router();

const expenseController = require('../controllers/expenseControl')

router.post('/addExpenses',userAuthentication.authentication ,expenseController.addExpenses);

router.get('/getExpenses',userAuthentication.authentication ,expenseController.getExpenses);

router.delete('/del/:id',userAuthentication.authentication,expenseController.delete);

router.get('/AllUsers',userAuthentication.authentication,expenseController.getAllUsers)

router.get('/AllExpense/:id',expenseController.getAllExpenses);



module.exports= router ;