const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./routes/auth");
//const LocalStrategy = require("passport-local").Strategy;
const person = require("./models/person");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
//const person = require("./models/person");
//const MenuItem = require("./models/menuItem");

//middleware
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} request made to: ${req.originalUrl}`);
    next();
 }


app.use(logRequest);



app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get("/", (req, res) => {
    res.send("welcome to my hotel");
});


const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const person = require("./models/person");
app.use("/person",localAuthMiddleware, personRoutes);
app.use("/menu", menuItemRoutes);




app.listen(PORT, () => {
    console.log("server is running on port 3000");
})