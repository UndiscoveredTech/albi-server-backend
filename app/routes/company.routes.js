const express = require('express');
const Company = require('../models/company.model');
const router = express.Router();
const companyController = require("../controllers/company.controller")

//get all company
router.get('/', companyController.getCompaniesList);

//submit a company
router.post('/', companyController.insertCompany);

//get specific company
router.get('/:companyId', companyController.getSingleCompany);

//delete specific company
router.delete('/:companyId', companyController.deleteCompany);

//update specific company
router.patch('/:companyId',companyController.updateCompany);

module.exports = router;