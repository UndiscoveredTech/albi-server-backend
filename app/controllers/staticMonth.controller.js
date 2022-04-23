const StaticMonth = require('../models/staticMonth.model');
const Monthly = require('../models/monthly.model');

const getList = async (req, res) => {
    try {
        const monthly = await StaticMonth.find();
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

const getIdByMonthAndYear = async (req,res) => {
    try {
        const monthYear = await StaticMonth.findOne({month: req.params.month, year: req.params.year});
        res.json(monthYear)
      } catch (err) {
        res.json({ message: err });
      }
}

const insertStaticMonth = async (req, res) => {
    const staticmonth = new StaticMonth({
        month: req.body.month,
        year: req.body.year
    });
    try {
        const savedMonth = await staticmonth.save();
        const monthly = new Monthly({
            monthYear: savedMonth,
            calculations: []
        });
        try {
            const savedMonthly = await monthly.save()
            const monthlyList = await Monthly.find();
            res.json(monthlyList);
        } catch (err) {
            res.json({ message: "err" });
        }
    } catch (err) {
        res.json({ message: "err22" });
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



module.exports = { getList, deleteCompany,getIdByMonthAndYear, insertStaticMonth, updateCompany, getSingle};