const mongoose = require("mongoose");
const Calculation = require("./calculation.model");

const Monthly = mongoose.model(
  "Monthly",
  new mongoose.Schema({
    monthYear: {
        type: mongoose.Types.ObjectId,
        ref: "StaticMonth",
        required: false
      },
    calculations: []
    
  },
  { timestamps: {} }

  )
);

module.exports = Monthly;