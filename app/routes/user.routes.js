const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const express = require('express');
const router = express.Router();

// module.exports = function(app) {
  // app.use(function(req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, Content-Type, Accept"
  //   );
  //   next();
  // });
  router.get('/',controller.getAllUsers);


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