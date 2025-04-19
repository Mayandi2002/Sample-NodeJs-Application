const express = require("express");
const { ObjectId } = require("mongodb");
const DBUtils = require("../utils/dbUtils");
const userRouter = express.Router();
const userSchema = require("../models/userSchema");


const usersTable = DBUtils.usersTable;

// GET all data
userRouter.get("/getAllUser", async (req, res) => {
    try {
        const collection = req.db.collection(usersTable);
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// POST - Add new data
userRouter.post("/addUser", async (req, res) => {
    try {

        const { error, value } = userSchema.data.validate(req.body, { abortEarly: false });
        if (error) {
            const formattedErrors = [];
            error.details.forEach(err => {
                const field = err.path[0];
                formattedErrors.push({"fieldName":field,"message":err.message})
            });
            console.log({ error: formattedErrors });
            
            return res.status(400).json({ message:"Please enter the valid data.", fieldValidationErrors: formattedErrors });
        }

        const collection = req.db.collection(usersTable);
        const findEmail = await collection.findOne({ email: req.body.email });
        const findUser = await collection.findOne({ userName: req.body.userName });

        if(findEmail){
            return res.status(400).json({ message:"This email is already exists."}); 
        }

        if(findUser){
            return res.status(400).json({ message:"This Username is already exists."}); 
        }

        const result = await collection.insertOne(value);

        res.status(200).json({ message: "Signup successfully", inserted_id: result.insertedId });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// GET by ID
userRouter.get("/getUser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const collection = req.db.collection(usersTable);
        const data = await collection.findOne({ _id: new ObjectId(id) });

        if (!data) {
            return res.status(404).json({ error: "Data not found" });
        }

        res.json(data);
    } catch (error) {
        console.error("Error fetching data by ID:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// DELETE by ID
userRouter.delete("/deleteUser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const collection = req.db.collection(usersTable);
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Data not found" });
        }

        res.json({ message: "Data deleted successfully" });
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = userRouter;
