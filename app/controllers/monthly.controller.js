const Monthly = require('../models/monthly.model');
const StaticMonth = require('../models/staticMonth.model');

const getList = async (req, res) => {
    

    try {
        const monthly = await Monthly.find();
        res.json(monthly);
    } catch (err) {
        res.json({ message: err });
    }
}





//Get single 
const getSingle = async (req, res) => {
    try {
      const company = await Company.findById(req.params.companyId);
      res.json(company)
    } catch (err) {
      res.json({ message: err });
    }
}

const addCalculationToMonthly = async (req, res) => {
    //find month and year by id
    console.log("))))  :", req.body.calculation.calculations);
    const monthYear = await StaticMonth.findById(req.body.calculation.monthYear);
    let listOfCalculations = [];
    if(monthYear){
        const monthYear1 = await Monthly.findOne({'monthYear': monthYear});
        console.log(monthYear1);
        listOfCalculations = monthYear1.calculations;
        if(listOfCalculations != []){
            listOfCalculations.every(function(x) {
                return (x.user_id.toString() !== req.body.calculation.calculations.user_id)
             }) ? 
             ((req.body.calculation.calculations != [] && req.body.calculation.calculations != null) ? listOfCalculations.push(req.body.calculation.calculations) : null)
                    :
             (
                 //Here update the calculations for an employee after he is pushed
                 listOfCalculations.splice(listOfCalculations.indexOf(
                    listOfCalculations.map(item => item.user_id === req.body.calculation.calculations.user_id)
                 ), 1, req.body.calculation.calculations)
    
             )
        } else{
            ((req.body.calculation.calculations != [] && req.body.calculation.calculations != null) ? listOfCalculations.push(req.body.calculation.calculations) : null)

        }


        
    }
    try {
        const updateMonthly = await Monthly.updateOne(
            { monthYear: req.body.calculation.monthYear },
            {
                $set: {
                    calculations: listOfCalculations
                }
            }
        );
        const monthlyList = await Monthly.find();
        res.json(monthlyList);
    } catch (err) {
        res.json({ message: err });
    }
}


const getCalculationForUserAndYearMonth = async (req,res) => {
    try {
        const monthlyObject = await Monthly.findOne({'monthYear': req.params.monthYear});

        let listOfCalculations = monthlyObject.calculations;
        let calculationForUser = listOfCalculations.find(item => item.user_id === req.params.userId)
        res.json(
            calculationForUser
        )
      } catch (err) {
        res.json({ message: err });
      }
}

const getCalculationForUserAndYearMonthService = async (monthyear,userId) => {
    try {
        const monthlyObject = await Monthly.findOne({monthYear: monthyear});
        let listOfCalculations = monthlyObject.calculations;
        let calculationForUser = listOfCalculations.find(item => item.user_id.toString() === userId.toString())
        return calculationForUser;
      } catch (err) {
        return null
      }
}

const updateCompany = async (req, res) => {
    try {
        const updateCompany = await Company.updateOne(
            { _id: req.params.companyId },
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    nipt: req.body.nipt
                }
            }
        );
        const companyList = await Company.find();
        res.json(companyList);
    } catch (err) {
        res.json({ message: err });
    }
}
const deleteCompany = async (req, res) => {
    try {
        const removeCompany = await Company.remove({ _id: req.params.companyId });
        const company = await Company.find();
        res.json(company)
    } catch (err) {
        res.json({ message: err });
    }
}



module.exports = { getList, deleteCompany, addCalculationToMonthly, updateCompany, getCalculationForUserAndYearMonthService,getCalculationForUserAndYearMonth,getSingle};