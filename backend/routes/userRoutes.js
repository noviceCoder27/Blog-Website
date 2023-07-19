const express = require('express');
const router = express.Router();
const {register,login,updateUserCredentials,storeUserId} = require('../controllers/userControllers');

router.post('/register',register);
router.post('/login',login);
router.put('/updateCredentials',storeUserId,updateUserCredentials);

module.exports = router; 