const router = require('express').Router();
const {adminctrl} = require('../controllers/indexctrl')
const tokenHandler = require('../handlers/tokenHandler')
router.post('/login',adminctrl.login);
router.get('/summary',tokenHandler.verifyAdminToken,adminctrl.summary);
router.post('/check-token', tokenHandler.verifyAdminToken, (req,res) =>{
    res.status(200).json('Authorized')
})
module.exports =router;