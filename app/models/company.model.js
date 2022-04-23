const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema ({
  name: {
    type: String,
    require: true
  },
  address: {
    type: String,
    default: "No address",
    require: true
  },
  nipt: {
    type: String,
    require: true,
    unique : true,

  },
  bonus: {
    type: Object,
    require: true,
    default: 0
  },
  users: [{
    type: mongoose.Types.ObjectId,
    ref: "Employee"
}],
  date: {
    type: Date,
    default: Date.now
}

});

module.exports = mongoose.model('Company', CompanySchema);