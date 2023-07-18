require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');

app.use('/user',userRoutes);


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Listening to port " + process.env.PORT);
    });
})
.catch((err) => {
    console.log("ERROR connecting to mongoose "+ err.message);
})
