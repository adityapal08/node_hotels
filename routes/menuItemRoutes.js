const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuItem");
const person= require("../models/person");

router.post("/", async (req, res)=> {
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

router.get("/", async (req, res)=> {
    try{
        const data = await MenuItem.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "internal server error"});

    }
});

router.get("/:taste", async (req, res) => {
    try {
        const menuItem = req.params.MenuItem;
        if(menuItem == "spicy" || menuItem == "sweet" || menuItem == "sour") {
            const response = await MenuItem.find({taste: menuItem});
            res.status(200).json(response);
        }else {
            res.status(400).json({error : "invalid work type"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "internal server error"});

    }
})

module.exports = router;