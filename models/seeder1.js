const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();;

const User = require("./userModel");
const fname = "./users1.json";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB connection successful!'));

console.log("seeder running");