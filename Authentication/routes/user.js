const express = require("express");
const { handleUserSignup, handleUserLogin, handleHome } = require('../controllers/user');
const { checkAuth } = require("../middleware/auth");
const router = express.Router();

router.post('/signup', handleUserSignup);
router.post('/login', handleUserLogin);
router.get('/',checkAuth,handleHome );


module.exports = router;