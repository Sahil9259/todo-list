const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

// Create a new task
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, completed, id } = req.body; // Extracting id from req.body
    const existingUser = await User.findById(id); // Finding user by id
    if (existingUser) {
      const list = new List({ title, body, completed, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

// Update a task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, completed } = req.body;
    if (completed) {
      res.status(200).json({ message: "Task Is Completed" });
      return; // Return early if task is completed
    }
    const list = await List.findByIdAndUpdate(req.params.id, { title, body, completed });
    res.status(200).json({ message: "Task Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, { $pull: { list: req.params.id } });
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Task Deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get tasks for a user
router.get("/getTasks/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
