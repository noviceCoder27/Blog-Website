const express = require('express');
const router = express.Router();
const {register,login,updateUserCredentials,getUser,getUserDetails,updateProfilePic} = require('../controllers/userControllers');
const authenticateJWT = require('../middleware/requireAuth');
const upload = require('../middleware/uploadPicture');

router.post('/register',register);
router.post('/login',login);
router.post('/userdetails',getUserDetails);
router.get('/getUser',authenticateJWT,getUser);
router.put('/profilePic',authenticateJWT,upload.single('profilePicture'),updateProfilePic);
router.put('/updateCredentials',authenticateJWT,updateUserCredentials);

module.exports = router; 