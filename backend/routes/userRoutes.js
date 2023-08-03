const express = require('express');
const router = express.Router();
const {register,login,updateUserCredentials,getUser,getUserNameAndDescription} = require('../controllers/userControllers');
const authenticateJWT = require('../middleware/requireAuth');

router.post('/register',register);
router.post('/login',login);
router.get('/userdetails',getUserNameAndDescription);
router.get('/getUser',authenticateJWT,getUser);
router.put('/updateCredentials',authenticateJWT,updateUserCredentials);

module.exports = router; 