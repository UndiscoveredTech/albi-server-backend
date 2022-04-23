const StaticMonth = require('../models/staticMonth.model');

class Helper {

    constructor( ){

    }

    static getMonthYearId = async (month:any, year: any) =>{        
        try {
            const monthYear = await StaticMonth.findOne({month: month, year: year});
            console.log(monthYear);

            return monthYear;
        } catch (err) {
            return "error";
        }
        
    }
}