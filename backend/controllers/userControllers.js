const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

let id;

function createToken(_id) {
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '1h'});
}

async function register(req,res) {
    let {email,password,userName,userDescription} = req.body;
    if(!password || !email) {
        return res.status(400).send("Please enter valid credentials");
    }
    if(!userName) {
        userName = '';
    }

    if(!userDescription) {
        userDescription = '';
    }
    try {
        const doesExist = await usersModel.findOne({email});
        if(doesExist) {
            return res.status(400).send("Email already exists");
        }
    } catch(err) {
        console.log(err);
        res.status(400).send("Error connecting to mongodb");
    }
    try {
        const user = await usersModel.register(email,password,userName,userDescription);
        const token = createToken(user._id);
        id = user._id;
        res.status(200).send({email:user.email,token});
    } catch(err) {
        console.log(err);
    }
}

async function login(req,res) {
    let {email,password} = req.body;
    if(!password || !email) {
        return res.status(400).send("Please enter valid credentials");
    }
    try {
        const user = await usersModel.login(email,password);
        const token = createToken(user._id);
        id = user._id;
        res.status(200).send({email:user.email,token});
    } catch(err) {
        console.log(err);
        res.status(400).send("Email alrady exists");
    }
}

async function updateUserCredentials(req,res) {
    const id = req.user._id;
    const {userName,userDescription} = req.body;
    const user = await usersModel.updateCredentials(userName,userDescription,id);
    res.status(200).send({updatedUsername: user.userName, updatedDescription: user.userDescription}); 
}

module.exports = {register,login,updateUserCredentials}