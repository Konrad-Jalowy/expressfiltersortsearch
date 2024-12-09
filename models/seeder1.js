const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();;

const User = require("./userModel");
const fname = "./users1.json";


 
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("seeder running");
    } catch (err) {
      console.log('error: ' + err)
    }
  })()