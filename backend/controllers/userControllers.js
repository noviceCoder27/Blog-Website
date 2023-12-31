const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const blogsModel = require('../models/blogsModel');


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
        res.status(400).send("No such user found");
    }
}

async function updateUserCredentials(req,res) {
    const id = req.user._id;
    const {userName,userDescription} = req.body;
    const user = await usersModel.findByIdAndUpdate(id,{userName,userDescription},{new:true});
    res.status(200).send({updatedUsername: user.userName, updatedDescription: user.userDescription}); 
}

async function getUser(req,res) {
    const id = req.user._id;
    try {
        const user = await usersModel.findById(id);
        res.status(200).send(user);
    } catch(err) {
        console.log(err);
        res.status(400).send("Error finding user");
    }
}

async function getUserDetails(req,res) {
    const {blog_id} = req.body;
    try {
        const blog = await blogsModel.findById(blog_id);
        const {user_id} = blog;
        try {
            const user = await usersModel.findById(user_id);
            res.status(200).send({
                name:user.userName,
                description:user.userDescription,
                email:user.email,
                profilePicture:user.profilePicture
            });
        } catch(err) {
            console.log(err);
        }
    } catch(err) {
        console.log(err);
        res.status(400).send("Error finding blog");
    }

}

async function updateProfilePic(req,res) {
    // Get the URL of the uploaded file
    const fileUrl = req.file.location;
    const id = req.user._id;
    try {
        await usersModel.findByIdAndUpdate(id, {profilePicture: fileUrl},{new:true});
        res.status(200).send("Successfully updated profile picture");
    } catch(err) {
        res.status(400).send("Failed to set profile pic");
    }
    
}

module.exports = {register,login,updateUserCredentials,getUser,getUserDetails,updateProfilePic}