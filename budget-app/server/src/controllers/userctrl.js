const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const {User, UserTransaction, Transaction} = require('../models/index')


exports.login = async (req,res) =>{
    try {
        const user  =await  User.findOne({
            username: req.body.username,
            password: req.body.password
        })
        if(!user){
            return res.status(401).json('Wrong Username')
        }
        const decryptedPass =CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)
        if(decryptedPass !== req.body.password){
            return res.status(401).json('Wrong Password')
        }
        const token = jwt.sign({
            id: user._id
        },process.env.TOKEN_SECRET_KEY)
        res.status(200).json({
            token,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.create =async (req,res,next) =>{
    const {
        username,
        email,
        password
    }=req.body
    try {
        let user  = await User.findOne({username: username})
        if(user){
            res.status(403).json('Username is already  used ')
        }
        user  = await User.findOne({email:email})
        if(user){
            res.status(403).json('Email is already used')
        }
        user  = await User.findOne({password:password})
        if(user){
            res.status(403).json('Password is already used')
        }
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        const token = jwt.sign({
            id: savedUser._id
        },process.env.TOKEN_SECRET_KEY)
        res.status(201).json({
            user:savedUser,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getAll =async(req,res) =>{
    try {
        const list = await User.find({}).sort('-createdAt')
        for(const user of list){
            const transaction = await Transaction.find({
               user:user._id
            }).sort('-createdAt')
            
        }
        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
   
}

exports.getOne =async(req,res) =>{
    try {
        const user = await User.findById(req.params.id)
        const transaction = await Transaction.find({
            creator:user._id
        }).sort('-createdAt')
        user._doc.transaction =transaction
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
   
}

exports.update =async(req,res) =>{
    const {
        username,
        password,
        email
    }=req.body
    try {
        let user  = await User.findOne({username: username})
        if(user){
            res.status(403).json('Username is already  used ')
        }
        user  = await User.findOne({email:email})
        if(user){
            res.status(403).json('Email is already used')
        }
        user  = await User.findOne({password:password})
        if(user){
            res.status(403).json('Password is already used')
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,{
                $set:req.body
            }
        )
        res.status(200).json(updateUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
   
}
exports.delete = async (req,res) =>{
    try {
        const {id} =req.params
        await UserTransaction.deleteMany({user:id})
        await User.findByIdAndDelete(id)
        res.status(200).json('Deleted')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


exports.summaryUser = async (req,res) =>{
    try {
        const totalTransaction= await Transaction.aggregate(
            [
              { $group : {_id:"$creator", amount:{$sum:'$amount'}}}
            ]
        )
        
        const totalTransactionIncome= await Transaction.aggregate(
            [
               {$match: {type: 'income'}},
               
            ]
        )
        const totalTransactionExpense= await Transaction.aggregate(
            [
               {$match: {type: 'expense'}},
               
            ]
        )
        const latestTransaction = await Transaction.find({}).sort('-createdAt').limit(4)
        res.status(200).json({
            totalTransaction:totalTransactionIncome[0].amount-totalTransactionExpense[0].amount,
            totalTransactionIncome:totalTransactionIncome[0].amount,
            totalTransactionExpense:totalTransactionExpense[0].amount,
            latestTransaction,
            transactionAnalyst:{
                totalTransaction:totalTransactionIncome[0].amount-totalTransactionExpense[0].amount,
                totalTransactionIncome:totalTransactionIncome[0].amount,
                totalTransactionExpense:totalTransactionExpense[0].amount,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

