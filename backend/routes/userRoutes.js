const express = require('express');
const router = express.Router();
const {register,login,updateUserCredentials} = require('../controllers/userControllers');


router.get('/register',register);
router.get('/login',login);
router.get('/updateCredentials',updateUserCredentials);

module.exports = router; 