const fs = require('fs').promises;
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();;

const User = require("./userModel");
const fname = "./users1.json";

const importData = async (users) => {
    try {
      await User.create(users);
      console.log('Data successfully created from json file!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
 
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        
        console.log("seeder running");
        const data = await fs.readFile(`${__dirname}/users1.json`, 'utf-8');
        const users = JSON.parse(data);
        console.log(users);
        importData(users);
    } catch (err) {
      console.log('error: ' + err)
    }
  })()