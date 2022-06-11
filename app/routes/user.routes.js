const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

const express = require('express');
const router = express.Router();

  router.get('/',controller.getAllUsers);

  router.get('/downloadExcel/:monthYear',controller.exportUser); // DOWNLOAD ROUTE
  router.get('/downloadExcel/:monthYear/:userId',controller.exportUser); // DOWNLOAD ROUTE


  router.get('/:userId',controller.getSingleUser);

  router.patch('/:userId/:companyId',controller.associateUser);


module.exports = router;