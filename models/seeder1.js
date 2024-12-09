const fs = require('fs').promises;
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();;

const User = require("./userModel");
const fname = "./users1.json";


 
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        
        console.log("seeder running");
        const users = await fs.readFile(`${__dirname}/users1.json`, 'utf-8');
        console.log(users);
    } catch (err) {
      console.log('error: ' + err)
    }
  })()