const { Transaction, UserTransaction } = require("../models/index");

exports.create = async (req, res) => {
  try {
    const newTransaction = new Transaction({
      ...req.body,
      
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const list = await Transaction.find({})
      .populate("creator")
      .sort("-createdAt");
    for (const transactionl of list) {
      const transaction = await Transaction.find({
        transactionl: transactionl._id,
      }).sort("-createdAt");
    }
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.update = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      }
    );
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    await UserTransaction.deleteMany({ transaction: req.params.id });
    await Transaction.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json("Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getIncome = async (req, res) => {
  try {
    const totalTransactionIncome = await Transaction.find({type:'income'}).sort('-createdAt')
    res.status(200).json({
      totalTransactionIncome,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getExpense = async (req, res) => {
  try {
    const totalTransactionExpense = await Transaction.find({}).where('expense')
    res.status(200).json({
      totalTransactionExpense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
