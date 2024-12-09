const express = require('express');

const UserRouter = require("./routes/userRoutes");


const app = express();

app.use("/", UserRouter);


module.exports = app;
