const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const { Admin, Transaction, User } = require('../models/index')

exports.login = async (req,res) =>{
    try {
        const admin  =await  Admin.findOne({
            username: req.body.username,
        })
        if(!admin){
            return res.status(401).json('Wrong Username')
        }
        const decryptedPass =CryptoJS.AES.decrypt(
            admin.password,
            process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)
        if(decryptedPass !== req.body.password){
            return res.status(401).json('Wrong Password')
        }
        const token = jwt.sign({
            id: admin._id
        },process.env.TOKEN_SECRET_KEY)
        admin.password =undefined
        res.status(200).json({
            token,
            admin
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.summary = async(req,res) =>{
    try {
        const totalUser = await User.find({}).count();
        const totalTransaction = await Transaction.find({}).count();
        res.status(200).json({
           totalUser,
           totalTransaction
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}