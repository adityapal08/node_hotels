const mongoose = require("mongoose");
require("dotenv").config();

//const mongoURL = process.env.MONGODB_URL;
const mongoURL = 'mongodb://Localhost:27017/hotels';
//const mongoURL = 'mongodb+srv://adi:Aditya24.@cluster0.dfp79.mongodb.net/'

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("connected", () => {
    console.log("connected to mongodb server");
});
db.on("error", (err)=> {
    console.log("error connecting to mongodb server", err);
});
db.on("disconnected", () => {
    console.log("disconnected from mongodb server");
});
module.exports = db;