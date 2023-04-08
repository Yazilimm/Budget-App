const router = require('express').Router();

router.use('/admin', require('./adminRoute'));
router.use('/user', require('./userRoute'));
router.use('/transaction', require('./transactionRoute'));
module.exports = router;
