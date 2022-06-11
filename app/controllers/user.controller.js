const User = require('../models/user.model');
const Calculation = require('../models/calculation.model');
const Company = require('../models/company.model');
const excelJS = require("exceljs");
const Role = require('../models/role.model');
const { updateCompany } = require('./company.controller');
const Monthly = require('../models/monthly.model');
const { grossSalaryAllTotal } = require('../models/calculation.model');
var uniqueFilename = require('unique-filename');
const emploeyeeName = Calculation.emploeyeeName;

console.log(emploeyeeName);
const exportUser = async (req, res) => { 
  generateExcelFile(req,res);
};


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





var Excel = require('exceljs');
const { generateExcelFile } = require('../services/generateExcel');
async function excelOp() {
    let workbook = new Excel.Workbook();
    workbook = await workbook.xlsx.readFile('files/KFA_Final.xlsx'); // replace question_39869739.xls with your file
    let worksheet = workbook.getWorksheet('Calculation 1'); // replace sheetname with actual sheet name
    worksheet.getRow(1).getCell(1).value = 350; // replace rowNumber and cellNumber with the row and cell you want to modify
    workbook.xlsx.writeFile('files/KFA_Final1.xlsx');
}

excelOp();
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
module.exports = { getAllUsers, getSingleUser, associateUser, exportUser };
