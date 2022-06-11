const mongoose = require("mongoose");

const Settings = mongoose.model(
  "Settings",
  new mongoose.Schema({
    
    salary: Number,
    bonusDay: Number,
    bonusNight: Number,

  })
);

module.exports = Settings;