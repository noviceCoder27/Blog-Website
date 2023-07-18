const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');


app.use('/',userRoutes);

app.listen(3000, () => {
    console.log("Listening to port 3000");
});
