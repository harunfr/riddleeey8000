#! /usr/bin/env node

console.log(
  'This script populates some riddles to your database. Specified database as argument - e.g.: populatedb mongoDB_URI, or use .env file.',
);

const Riddle = require('./models/Riddle');

const fs = require('fs');

const mongoose = require('mongoose');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
const mongoDB = userArgs[0] || process.env.MONGO_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const sendJsonToDb = () => {
  fs.readFile('./riddlesData.json', 'utf8', (err, riddlesJson) => {
    if (err) {
      console.log('Error reading file from disk:', err);
      return;
    }
    try {
      const riddles = JSON.parse(riddlesJson);
      // Main populate logic is below this line
      const postAllData = async () => {
        let count = 0;
        riddles.map(async (riddleObj) => {
          await Riddle.create({
            body: riddleObj.riddle,
            answer: riddleObj.answer,
            approved: true,
          });
          count += 1;
          console.log('sent 1 of them, total sent: ' + count);
        });
      };
      postAllData();

      // console.log("Customer address is:", customer.address); // => "Customer address is: Infinity Loop Drive"
    } catch (err) {
      console.log('Error parsing JSON string:', err);
    }
  });
};

sendJsonToDb();
