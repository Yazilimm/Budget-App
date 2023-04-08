const mongoose = require('mongoose');
const {schemaOptions} = require('./modelOptions');
const Schema = mongoose.Schema
const transactionSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    amount:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: new Date()
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref:'User',
       
    }
}, schemaOptions)

module.exports = mongoose.model('Transaction', transactionSchema)