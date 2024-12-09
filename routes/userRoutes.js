const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.param("id", UserController.paramMiddleware);
router.get("/", UserController.main);
router.get("/manual/all", UserController.manualGetAll);
router.get("/fluent/all", UserController.fluentGetAll);
router.get("/:id", UserController.byId);


module.exports = router;