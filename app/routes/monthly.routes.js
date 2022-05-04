const controller = require("../controllers/monthly.controller");
const express = require('express');
const router = express.Router();

router.get('/',controller.getList);


  //insert monthly
  router.post('/completeEmployee',controller.addCalculationToMonthly);

  router.get('/employCalculation/:monthYear/:userId',controller.getCalculationForUserAndYearMonth);

//   router.get('/:userId',controller.getSingleEmployee);

//   //delete employee
//   router.delete('/:employeeId',controller.deleteEmployee);


//   router.patch('/:employeeId/:companyId',controller.associateEmployee);

//   router.patch('/',controller.updateMonthly);


  // app.get("/api/test/all", controller.allAccess);

  // app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );


// };

module.exports = router;