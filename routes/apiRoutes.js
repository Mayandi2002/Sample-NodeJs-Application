const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

// GET all data
router.get("/", async (req, res) => {
    try {
        const collection = req.db.collection("Mayandi_Collections");
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// POST - Add new data
router.post("/add", async (req, res) => {
    try {
        const newData = req.body;
        if (!newData || Object.keys(newData).length === 0) {
            return res.status(400).json({ error: "Invalid input data" });
        }

        const collection = req.db.collection("Mayandi_Collections");
        const result = await collection.insertOne(newData);

        res.status(201).json({ message: "Data inserted successfully", inserted_id: result.insertedId });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// GET by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const collection = req.db.collection("Mayandi_Collections");
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
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const collection = req.db.collection("Mayandi_Collections");
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

module.exports = router;
