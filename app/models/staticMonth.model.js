const mongoose = require("mongoose");

const StaticMonth = mongoose.model(
  "StaticMonth",
  new mongoose.Schema({
    month: String,
    year: Number,
    
  })
);

module.exports = StaticMonth;