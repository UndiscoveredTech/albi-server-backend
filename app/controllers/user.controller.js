const User = require('../models/user.model');
const Calculation = require('../models/calculation.model');
const Company = require('../models/company.model');
const excelJS = require("exceljs");
const Role = require('../models/role.model');
const { updateCompany } = require('./company.controller');
const Monthly = require('../models/monthly.model');

const exportUser = async (req, res) => { 
  const workbook = new excelJS.Workbook();  // Create a new workbook
  const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
  const path = "./files";  // Path to download excel
  var calculations = [];
  try {
    const monthlyObject = await Monthly.findOne({'monthYear': req.params.monthYear});

    calculations = monthlyObject.calculations;
    // let calculationForUser = listOfCalculations.find(item => item.user_id === req.params.userId)
    
  } catch (err) {
    res.json({ message: err });
  }

  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "Name of Employee", key: "emploeyeeName", width: 20, wrapText: true }, 
    { header: "Monthly Base Net Salary Eur", key: "monthlyNetSalary", width:10, wrapText: true }, 
    { header: "Monthly Gross Salary", key: "grossOfNet", width:10 }, 
    { header: "Hourly wage (21days/8 hours)", key: "hourlyWage", width:10 }, 
    { header: "Normal working hours (07:00-15:00)", key: "normalWorkingHours", width:10 },
    { header: "Overtime hours during week +25% (15:00-19:00+06:00-07:00)", key: "overtimeDuringWeek25", width:10 },
    { header: "Overtime hours during week +50% (22:00-06:00)", key: "overtimeDuringWeek50", width:10 },
    { header: "Week working hours +20% (19:00-22:00)", key: "weekWorkinghours19_20", width:10 },
    { header: "Nr of working hours on Saturdays and Sundays +25%", key: "workingHoursOnWeekend", width:10 },
    { header: "Overtime hours on Saturdays and Sundays +50%", key: "overtimeWeekend", width:10 },
    { header: "Paid Holiday Leave", key: "paidHoliday", width:10 },
    { header: "Total paid days", key: "totalPaidDays", width:10 },
    { header: "Gross Salary ALL", key: "grossSalaryAll", width:10 },
    { header: "Bonus Bruto", key: "bonusBruto", width:10 },
    { header: "Gross Salary Total ALL", key: "brutoOfNewNetValue", width:10 },
    { header: "Level of Soc.Insurance ALL", key: "levelOfSocInsurance", width:10 },
    { header: "Soc.insurance ALL 9,50%", key: "socInsurance", width:10 },
    { header: "Health Insurance ALL 1,70%", key: "healthInsurance", width:10 },
    { header: "Total ALL 11,2%", key: "totalInsurance", width:10 },
    { header: "Soc.ins.of Employer ALL 15%", key: "socInsuranceCOM", width:10 },
    { header: "Health Insurance of Employer ALL 1,70%", key: "healthInsuranceCOM", width:10 },
    { header: "Total ALL 16,70%", key: "totalInsuranceCOM", width:10 },
    { header: "Salary before Income ALL", key: "salaryBeforeIncomeLEK", width:10 },
    { header: "Income Tax ALL Progresiv", key: "incomeTax", width:10 },
    { header: "Nett Salary of Employee ALL", key: "netSalaryCOMAll", width:10 },
    { header: "Nett Salary of Employee Eur", key: "netSalaryCOMAEuro", width:10 },
    { header: "Cost of Employer", key: "costOfEmployer", width:10 },
    { header: "Agency Commision 9%", key: "agencyComision", width:10 },
    { header: "Total without VAT", key: "totalWithoutVAT", width:10 },
    { header: "VAT10% ", key: "VAT", width:10 },
    { header: "Total with VAT", key: "totalWithVAT", width:10 },
    




     
    
];
// Looping through User data
worksheet.addRows(calculations);

//let counter = 1;
// calculations.forEach((user) => {
//   // user.user_id = counter;
//   worksheet.addRow(user); // Add data in worksheet
//   counter++;
// });

worksheet.getRow(1).eachCell((cell) => {
  
  cell.alignment = {vertical: 'middle', horizontal: 'center', wrapText: true, fontSize: 9 };
  cell.font = {size: 9, name: 'Calibri'};
  cell.border = {
    top: {style:'thin'},
    left: {style:'thin'},
    bottom: {style:'thin'},
    right: {style:'thin'}
  };


});
try {
  const data = await workbook.xlsx.writeFile(`${path}/users.xlsx`)
   .then(() => {
     res.send({
       status: "success",
       message: "file successfully downloaded",
       path: `${path}/users.xlsx`,
      });
   });
} catch (err) {
    res.send({
    status: "error",
    message: err,
  });
  }
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
