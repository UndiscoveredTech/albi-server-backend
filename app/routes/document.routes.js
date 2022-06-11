const express = require('express');
const router = express.Router();
const documentGeneratorController = require("../controllers/documentGenerator.controller")

//generate document
router.get('/', documentGeneratorController.generate);

module.exports = router;