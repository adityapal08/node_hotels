const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const person = require("./models/person");
const MenuItem = require("./models/menuItem");

app.get("/", (req, res) => {
    res.send("welcome to my hotel");
});

app.post("/person", async (req, res)=> {
   try {
    const data = req.body;

    const newPerson = new person(data);

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);

   } catch(err){
    console.log(err);
    res.status(500).json({error: "internal server error"});

   }
});

app.get("/person", async (req, res)=> {
    try{
        const data = await person.find();
        consile.log("data fetched");
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "internal server error"});

    }
});

app.post("menu", async (req, res)=> {
    try{
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log("data is saved");
        res.status(200).json(response);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"});
    }
} );

app.get("/menu", async (req, res)=> {
    try{
        const data = await MenuItem.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "internal server error"});

    }
});

app.get("/person/:workType", async (req, res) => {
    try {
        const workType = req.params.workType;
        if(workType == "chef" || workType == "waiter" || workType == "manager") {
            const response = await person.find({work: workType});
            console.log("data fetched");
            res.status(200).json(response);
        }else {
            res.status(400).json({error : "invalid work type"});
        }
    } catch (err){
        console.log(err);
        res.status(500).json({error: "internal server error"});


    }
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
})