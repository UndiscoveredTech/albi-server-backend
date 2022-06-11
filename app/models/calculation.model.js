// const mongoose = require("mongoose");

const Calculation  = {
    netValueEU: Number,
    grossOfNetAll: Number,
    grossOfNetEuro: Number,
    hourlyWage: Number,
    bonusBrutoDayShift: Number,
    bonusBrutoNightShift: Number,
    normalWorkingHours: Number,
    overtimeDuringWeek25Day: Number,
    overtimeDuringWeek25Night: Number,
    overtimeDuringWeek50: Number,
    weekWorkinghours19_20: Number,
    workingHoursOnWeekendDay: Number,
    workingHoursOnWeekendNight: Number,
    overtimeWeekend: Number,
    annualLeave: Number,
    sickDays: Number,
    totalPaidDay: Number,
    totalPaidNight: Number,
    totalPaidDays: Number,
    perdiems: Number,
    transport: Number,
    hotel: Number,
    grossSalaryAll: Number,
    bonusBrutoDayShiftF1: Number,
    bonusBrutoNightShiftF2: Number,
    grossSalaryAllTotal: Number,
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