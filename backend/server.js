require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const mongoose = require('mongoose');


app.use(express.json());
app.use('/user',userRoutes);
app.use('/blogs',blogRoutes);


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Listening to port " + process.env.PORT);
    });
})
.catch((err) => {
    console.log("ERROR connecting to mongoose "+ err.message);
})
