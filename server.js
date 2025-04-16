const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
//const person = require("./models/person");
//const MenuItem = require("./models/menuItem");

app.get("/", (req, res) => {
    res.send("welcome to my hotel");
});

//middleware
//const logRequest = (req, res, next) => {
  //  console.log(`${new Date().toLocaleString()} request made to: ${req.originalUrl}`);
    //next();
//}




const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);




app.listen(3000, () => {
    console.log("server is running on port 3000");
})