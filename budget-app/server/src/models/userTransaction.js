const mongoose = require('mongoose');
const {schemaOptions} = require('./modelOptions');
const Schema = mongoose.Schema
const userTransactionSchema = new mongoose.Schema({
   user:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
   },
   transaction:{
      type:Schema.Types.ObjectId,
      ref:'Transaction',
      required:true
   }
}, schemaOptions)

module.exports = mongoose.model('UserTransaction', userTransactionSchema)