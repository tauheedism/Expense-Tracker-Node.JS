const express = require('express')

const router = express.Router();

const expenseController = require('../controllers/expenseControl')

router.post('/addExpenses',expenseController.addExpenses);

router.get('/getExpenses',expenseController.getExpenses);

router.delete('/del/:id',expenseController.delete);



module.exports= router ;