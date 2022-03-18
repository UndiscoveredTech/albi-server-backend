const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema ({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    default: "No description",
    require: true
  },
  nipt: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
}

});

module.exports = mongoose.model('Company', CompanySchema);
