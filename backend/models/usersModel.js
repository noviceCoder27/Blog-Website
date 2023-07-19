const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');


const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String
    },
    userDescription: {
        type: String
    },
    
},{timestamps: true});

usersSchema.statics.register = async function(email,password,userName,userDescription){
    if(!email || !password) {
        throw Error("Please fill in the required credentials");
    }
    if(!validator.isEmail(email)) {
        throw Error("Enter a valid email");
    }

    const doesExist = await this.findOne({email});
    if(doesExist) {
        throw Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const user = await this.create({email,password:hash,userName,userDescription});
    return user;
}

usersSchema.statics.login = async function(email,password){
    if(!email || !password) {
        throw Error("Please fill in the required credentials");
    }
    if(!validator.isEmail(email)) {
        throw Error("Enter a valid email");
    }

    const user = await this.findOne({email});
    if(!user) {
        throw Error("Email doesn't exists");
    }
    
    const isValidPasswaord = await bcrypt.compare(password,user.password);
    if(!isValidPasswaord) {
        throw Error("Invalid Password");
    }
    return user;
}

usersSchema.statics.updateCredentials = async function(userName,userDescription,id) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        throw Error("ID doesn't match the profile");
    }
    const user = await this.findOne({id});
    const updatedUserObj = {...user,userName,userDescription};
    const updatedUser = await this.findByIdAndUpdate(id,updatedUserObj,{new: true});
    return updatedUser;
}


module.exports = mongoose.model("Users", usersSchema);