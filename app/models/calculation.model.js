// const mongoose = require("mongoose");

const Calculation  = {
    monthlyGrossSalary: Number,
    hourlyWage: Number,
    normalWorkingHours: Number,
    nightWorkingHoursDuringWeek: Number,
    overtimeDuringWeek: Number,
    workingHoursOnWeekend: Number,
    nightWorkingHoursDuringWeekend: Number,
    overtimeDuringWeekend: Number,
    totalPaidDays: Number,
    grossSalaryAll: Number,
    levelOfInsurance: Number,
    user_id: String
}


module.exports = Calculation;