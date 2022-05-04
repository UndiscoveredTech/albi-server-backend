const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

const express = require('express');
const router = express.Router();

  router.get('/',controller.getAllUsers);

  router.get('/downloadExcel/:monthYear',controller.exportUser); // DOWNLOAD ROUTE

  router.get('/:userId',controller.getSingleUser);

  router.patch('/:userId/:companyId',controller.associateUser);

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