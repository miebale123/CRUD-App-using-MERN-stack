const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = 3001;
const client = new MongoClient("mongodb://localhost:27017");
let db;

client.connect().then(() => {
  db = client.db("mydb");
  console.log("✅ Connected to MongoDB");
});

app.use(cors());
app.use(express.json());

// 🟢 Create
app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  const result = await db.collection("tasks").insertOne({ title });
  res.status(201).json(result);
});

// 🔵 Read
app.get("/tasks", async (req, res) => {
  const tasks = await db.collection("tasks").find().toArray();
  res.json(tasks);
});

// 🟡 Update
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  await db
    .collection("tasks")
    .updateOne({ _id: new ObjectId(id) }, { $set: { title } });
  res.json({ message: "Task updated" });
});

// 🔴 Delete
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await db.collection("tasks").deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Task deleted" });
});

app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
