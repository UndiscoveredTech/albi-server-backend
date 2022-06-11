const mongoose = require("mongoose");

const User = mongoose.model(
  "Employee",
  new mongoose.Schema({
    name: String,
    bankaccount: String,
    companyName: String,

    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: false
    },
  })
);

module.exports = User;