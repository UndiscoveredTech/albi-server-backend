const User = require('../models/user.model');
const Company = require('../models/company.model');

const Role = require('../models/role.model');
const { updateCompany } = require('./company.controller');


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


const getAllUsers = async (req, res) => {
  try {
    let roles1 = [];
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
}


const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user)
  } catch (err) {
    res.json({ message: err });
  }
}


//Associate user with a company
const associateUser = async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          company: req.params.companyId
        }
      }
    );
  }
  catch (err) {
    res.json({ message: err });
  }
  const companyFindById = await Company.findById(req.params.companyId);

  companyFindById.users.push(req.params.userId)

  try {
    const updateCompany = await Company.updateOne(
      { _id: req.params.companyId },
      {
        $set: {
          users: companyFindById.users
        }
      }
    );
  }
  catch (err) {
    res.json({ message: err });
  }
  try {
    const company = await Company.findById(req.params.companyId);
    res.json(company)
  } catch (err) {
    res.json({ message: err });
  }
}
module.exports = { getAllUsers, getSingleUser, associateUser };
