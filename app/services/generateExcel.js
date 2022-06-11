const Calculation = require('../models/calculation.model');
const excelJS = require("exceljs");
const Monthly = require('../models/monthly.model');
var uniqueFilename = require('unique-filename');


 const generateExcelFile = async (req, res) => { 
    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet('emploeyeeName'); // New Worksheet
    const path = "./files";  // Path to download excel
    var randomNum = uniqueFilename(path, 'KCA');
    let calculations = [];
    var userToExport;
    var index = 2;
    try {
      const monthlyObject = await Monthly.findOne({'monthYear': req.params.monthYear});
  
      calculations = monthlyObject.calculations;
  
      let userIdToExport = req.params.userId;
      if(userIdToExport && userIdToExport != ""){
        
        calculations = calculations.filter(item => {
              return item.user_id === userIdToExport
            })
      }
  
      // let calculationForUser = listOfCalculations.find(item => item.user_id === req.params.userId)
      
    } catch (err) {
      res.json({ message: err });
    }
  
  
    // Column for data in excel. key must match data key
    worksheet.columns = [
      { header: "Nr", key: "index", width: 5},
      { header: "Name of Employee", key: "emploeyeeName", width: 20},
      { header: "Salary NETO", key: "netValueEU", style: { numFmt: '0€'}, width:10},
      { header: "Salary Bruto", key: "grossOfNetEuro", style: { numFmt: '0.00€'}, width:10 },
      { header: "Monthly Gross Salary", key: "grossOfNetAll", width:10},
      { header: "Hourly wage (21days*8 hours)", key: "hourlyWage", width:10 },
      { header: "Bonus Bruto Day Shift", key: "bonusBrutoDayShift", width:10 },
      { header: "Bonus Bruto Night Shift", key: "bonusBrutoNightShift", width:10 },
      { header: "Normal working hours (07:00-15:00)", key: "normalWorkingHours", style: { numFmt: '0.00'}, width:10 },
      { header: "Overtime hours during week +25% (15:00-19:00) (Day Shift)", key: "overtimeDuringWeek25Day", style: { numFmt: '0.00'}, width:10 },
      { header: "Overtime hours during week +25% (06:00-07:00) (Night Shift)", key: "overtimeDuringWeek25Night", style: { numFmt: '0.00'}, width:10 },
      { header: "Overtime hours during week +50% (22:00-06:00) (Night Shift)", key: "overtimeDuringWeek50", style: { numFmt: '0.00'}, width:10 },
      { header: "Week working hours +20% (19:00-22:00) (Night Shift)", key: "weekWorkinghours19_20", style: { numFmt: '0.00'}, width:10 },
      { header: "Nr of working hours on Saturdays and Sundays +25%/Holidays (Day Shift)", key: "workingHoursOnWeekendDay", style: { numFmt: '0.00'}, width:10 },
      { header: "Overtime on Saturdays and Sundays +50%/Holidays (Day Shift)", key: "overtimeWeekend", style: { numFmt: '0.00'}, width:10 },
      { header: "Nr of working hours on Saturdays and Sundays +50%/Holidays (Night Shift)", key: "workingHoursOnWeekendNight", style: { numFmt: '0.00'}, width:10 },
      { header: "Annual Leave (normal days)", key: "annualLeave", style: { numFmt: '0.00'}, width:10 },
      { header: "Sick Days 70%", key: "sickDays", style: { numFmt: '0.00'}, width:10 },
      { header: "Paid days (Day Shift)", key: "totalPaidDay", style: { numFmt: '0.00'}, width:10 },
      { header: "Paid days (Night Shift)", key: "totalPaidNight", style: { numFmt: '0.00'}, width:10 },
      { header: "Total paid days", key: "totalPaidDays", style: { numFmt: '0.00'}, width:10 },
      { header: "Gross Salary ALL", key: "grossSalaryAll", width:10 },
      { header: "Bonus Bruto (Day Shift)", key: "bonusBrutoDayShiftF1", width:10 },
      { header: "Bonus Bruto (Night Shift)", key: "bonusBrutoNightShiftF2", width:10 },
      { header: "Gross Salary Total ALL", key: "grossSalaryAllTotal", width:10 },
      { header: "Level of Soc.Insurance ALL", key: "levelOfSocInsurance", style: { numFmt: '0'}, width:10 },
      { header: "Soc.insurance ALL 9,50%", key: "socInsurance", width:10 },
      { header: "Health Insurance ALL 1,70%", key: "healthInsurance", width:10 },
      { header: "Total ALL 11,2%", key: "totalInsurance", width:10 },
      { header: "Soc.ins.of Employer ALL 15%", key: "socInsuranceCOM", width:10 },
      { header: "Health Insurance of Employer ALL 1,70%", key: "healthInsuranceCOM", width:10 },
      { header: "Total ALL 16,70%", key: "totalInsuranceCOM", width:10 },
      // { header: "Salary before Income ALL", key: "grossSalaryAllTotal", width:10 },
      { header: "Income Tax ALL Progresiv", key: "incomeTax", width:10 },
      { header: "Nett Salary of Employee ALL", key: "netSalaryCOMAll", width:10 },
      { header: "Nett Salary of Employee Eur", key: "netSalaryCOMAEuro", style: { numFmt: '0.00€'}, width:10 },
      { header: "Perdiems", key: "perdiems", width:10 },
      { header: "Transport Cost", key: "transport", width:10 },
      { header: "Hotel", key: "hotel", width:10 },
      { header: "Cost of Employer / Employee /Kosto e punedhenesit", key: "costOfEmployer", width:20 },
      { header: "Agency Commision 9%/Komision", key: "agencyComision", width:10 },
      { header: "Total without VAT /Totali pa tvsh", key: "totalWithoutVAT", width:10 },
      { header: "VAT 20% /TVSh", key: "VAT", width:10 },
      { header: "Total with VAT /Totali me TVSH", key: "totalWithVAT", width:10 },
  
  
  
      
  ];
  // Looping through User data
  
  
//   worksheet.mergeCells('A1:F1');

worksheet.addRow({}).commit();
worksheet.addRow({}).commit();

worksheet.addRow({}).commit();

worksheet.getRow(1).eachCell({ includeEmpty: true }, function(cell) {
    worksheet.getCell(cell.address).fill = {
      type: 'pattern',
      pattern: 'gray125',
    }
  })

  worksheet.addRow({}).commit();

  worksheet.addRow({}).commit();

  worksheet.addRow({}).commit();

let counter = 1;
  calculations.forEach((user) => {
  
    // user.user_id = counter;
    worksheet.addRow(user); // Add data in worksheet
    counter++;
    worksheet.columns.forEach(column => {
  
      column.border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };
    
    })
  });
  
  
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
  
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + randomNum+".xlsx"
  );
  
  try {
    const data = await workbook.xlsx.write(res)
     .then(() => {
       res.send({
         status: "success",
         message: "file successfully downloaded",
        });
     });
  } catch (err) {
      res.send({
      status: "error",
      message: err,
    });
    }
  };


  module.exports = {
    generateExcelFile
  }