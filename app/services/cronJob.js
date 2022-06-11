const { getCalculationForYearMonthService } = require("../controllers/monthly.controller");
const Monthly = require("../models/monthly.model");
const StaticMonth = require("../models/staticMonth.model")

const generateDataForNewMonth = async () => {
    const staticMonthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let monthIndex = -1;
    let actualYear = 0;
    try {
        let listOfMonths = await StaticMonth.find();
        const lastMonth =  listOfMonths[listOfMonths.length - 1];
        monthIndex = staticMonthList.indexOf(lastMonth.month);
        actualYear = lastMonth.year;


        let monthYear = lastMonth._id;
        let staticmonth = null;
        if(monthIndex < staticMonthList.length  - 1){
            staticmonth = new StaticMonth({
                month: staticMonthList[monthIndex+1],
                year: actualYear
            });
        } else{
            staticmonth = new StaticMonth({
                month: staticMonthList[0],
                year: actualYear + 1
            });
        }

        let copiedCalculations  = []
         getCalculationForYearMonthService(monthYear).then( result => {
             copiedCalculations = result;
         });

        try {
            const savedMonth = await staticmonth.save();
            const monthly = new Monthly({
                monthYear: savedMonth,
                calculations: copiedCalculations
            });
            try {
                const savedMonthly = await monthly.save()
                const monthlyList = await Monthly.find();
            } catch (err) {
                console.log("ERROR: ", err);
            }
        } catch (err) {
            console.log("ERROR: ", err);
        }
    } catch (err) {
        console.log("ERROR: ", err);
    }

}


module.exports = {
    generateDataForNewMonth
  }