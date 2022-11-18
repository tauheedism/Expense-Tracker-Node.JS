const express = require('express');

const userAuthentication = require('../middleware/auth')

const router = express.Router();

const expenseController = require('../controllers/expenseControl')

router.post('/addExpenses',userAuthentication.authentication ,expenseController.addExpenses);

router.get('/getExpenses',userAuthentication.authentication ,expenseController.getExpenses);

router.delete('/del/:id',userAuthentication.authentication,expenseController.deleteDetails);

router.get('/AllUsers',userAuthentication.authentication,expenseController.getAllUsers)

router.get('/AllExpense/:id',expenseController.getAllExpenses);

router.get('/getReport',userAuthentication.authentication,expenseController.getDailyExpense)

router.get('/getWeeklyReport',userAuthentication.authentication,expenseController.weeklyExpense)

// router.get('/limited', expenseController.getIndexPagination);



module.exports= router ;