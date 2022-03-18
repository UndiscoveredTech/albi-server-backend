const Company = require('../models/company.model');

const getCompaniesList = async (req,res) => {
    try {
        const company = await Company.find();
        res.json(company);
    } catch (err) {
        res.json({ message: err });
    }
}
 


const deleteCompany = async (req,res) => {
    try {
        const removeCompany = await Company.remove({ _id: req.params.companyId });
        const company = await Company.find();
        res.json(company)
    } catch (err) {
        res.json({ message: err });
    }
}
module.exports = {getCompaniesList,deleteCompany};
