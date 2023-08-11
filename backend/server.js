require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const mongoose = require('mongoose');
const cors = require("cors");


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: "http://localhost:5173"
}));
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
