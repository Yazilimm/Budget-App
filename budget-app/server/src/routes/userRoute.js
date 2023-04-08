const express = require('express');
const router = express.Router();
const tokenHandler = require('../handlers/tokenHandler')
const {userctrl} = require('../controllers/indexctrl')
router.post('/login',userctrl.login);
router.post('/',tokenHandler.verifyToken,userctrl.create)
router.get("/", tokenHandler.verifyToken, userctrl.getAll)
router.get('/summary', tokenHandler.verifyToken,userctrl.summaryUser)
router.get('/:id',tokenHandler.verifyToken,userctrl.getOne)
router.put('/:id',tokenHandler.verifyToken,userctrl.update)
router.delete('/:id',tokenHandler.verifyToken,userctrl.delete)

module.exports = router;
