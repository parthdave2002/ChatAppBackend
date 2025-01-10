const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URL;

const ConnectDB = async () =>{
    try {
        await mongoose.connect(mongoURL)
        console.log("MongoDB connected..")
      } catch (error) {
        console.error(error.message)
        process.exit(1)
      }
}

module.exports = ConnectDB;