const express = require('express');
const router = express.Router();
const {register,login,updateUserCredentials} = require('../controllers/userControllers');
const authenticateJWT = require('../middleware/requireAuth');

router.post('/register',register);
router.post('/login',login);
router.put('/updateCredentials',authenticateJWT,updateUserCredentials);

module.exports = router; 