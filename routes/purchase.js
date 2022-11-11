const express = require('express');

const purchaseController = require('../controllers/purchase');

const purchaseAuthentication = require('../middleware/auth');

const router = express.Router();

router.get('/premiummembership', purchaseAuthentication.authentication,purchaseController.purchasepremium);

router.post('/updatetransactionstatus', purchaseAuthentication.authentication, purchaseController.updateTransactionStatus)

module.exports = router;