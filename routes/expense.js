const express = require('express');

const userAuthentication = require('../middleware/auth')

const router = express.Router();

const expenseController = require('../controllers/expenseControl')

router.post('/addExpenses',userAuthentication.authentication ,expenseController.addExpenses);

router.get('/getExpenses',userAuthentication.authentication ,expenseController.getExpenses);

router.delete('/del/:id',userAuthentication.authentication,expenseController.delete);



module.exports= router ;