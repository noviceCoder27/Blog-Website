const usersModel = require("../models/usersModel");
const jwt = require('jsonwebtoken');

async function authenticateJWT(req,res,next) {
    const {authorization} = req.headers;
    if(!authorization) {
        return res.status(400).send("Authorization token required");
    }
    const tokenObj = authorization.split(" ")[1];
    const {token} = JSON.parse(tokenObj);
    try {
        const {_id} = jwt.verify(token,process.env.SECRET);
        const user = await usersModel.findOne({_id}); 
        req.user = user;
        next();
    } catch(err) {
        console.log(err);
        res.status(400).send("User not authorized");
    }
    
}

module.exports = authenticateJWT