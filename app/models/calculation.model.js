// const mongoose = require("mongoose");

const Calculation  = {
    monthlyNetSalary: Number,
    grossOfNet: Number,
    hourlyWage: Number,
    normalWorkingHours: Number,
    overtimeDuringWeek25: Number,
    overtimeDuringWeek50: Number,
    weekWorkinghours19_20: Number,
    workingHoursOnWeekend: Number,
    overtimeWeekend: Number,
    totalPaidDays: Number,
    paidHoliday: Number,
    grossSalaryAll: Number,
    bonusBruto: Number,
    brutoOfNewNetValue: Number,
    levelOfSocInsurance: Number,
    socInsurance: Number,
    healthInsurance: Number,
    totalInsurance: Number,
    socInsuranceCOM: Number,
    healthInsuranceCOM: Number,
    totalInsuranceCOM: Number,
    salaryBeforeIncomeLEK: Number,
    incomeTax: Number,
    netSalaryCOMAll: Number,
    netSalaryCOMAEuro: Number,
    netSalaryPlusBonus: Number,
    costOfEmployer: Number,
    agencyComision: Number,
    totalWithoutVAT: Number,
    VAT: Number,
    totalWithVAT: Number,
  
    
    exchangeRate: Number,
    emploeyeeName: String,
    user_id: String
}


module.exports = Calculation;