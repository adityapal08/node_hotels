const mongoose = require("mongoose");

const mongoURL = 'mongodb://Localhost:27017/hotels';

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