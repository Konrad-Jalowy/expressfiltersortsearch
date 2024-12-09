const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


router.get("/", UserController.main);
router.get("/:id", UserController.byId);


module.exports = router;