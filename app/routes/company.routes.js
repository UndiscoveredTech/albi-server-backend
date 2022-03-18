const express = require('express');
const Company = require('../models/company.model');
const router = express.Router();
const companyController = require("../controllers/company.controller")

//get all company
router.get('/', companyController.getCompaniesList);

//submit a company

router.post('/', async (req, res) => {
    const company = new Company({
        name: req.body.name,
        description: req.body.description,
        nipt: req.body.nipt
    });
    try {
        const savedCompany = await company.save()
        res.json(savedCompany);
    } catch (err) {
        res.json({ message: err });
    }
});

//get specific company
router.get('/:companyId', async (req, res) => {
    try {
        const company = await Company.findById(req.params.companyId);
        res.json(company)
    } catch (err) {
        res.json({ message: err });
    }
});

//delete specific company
router.delete('/:companyId', companyController.deleteCompany);

//update specific company
router.patch('/:companyId', async (req, res) => {
    try {
        const updateCompany = await Company.updateOne(
            { _id: req.params.companyId },
            { $set: { 
                name: req.body.name,
                description: req.body.description,
                nipt: req.body.nipt
                } 
            }
        );
        res.json(updateCompany)
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;