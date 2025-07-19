const express = require("express");
const router = express.Router();
const User = require("../models/user");
const List = require("../models/tlist");

router.post("/addTask", async (req, res) => {
  try {
    const { id, title, description, date, priority } = req.body;
    const existinguser = await User.findById(id);
    if (existinguser) {
      const list = new List({
        title,
        description,
        date,
        priority,
        user: existinguser,
      });
      await list.save();
      res.status(200).json(list);
      existinguser.List.push(list);
      existinguser.save();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//update
router.put("/addTask/:id", async (req, res) => {
  try {
    const { email, title, description, date, priority } = req.body;
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      const llist = await List.findByIdAndUpdate(req.params.id, {
        title,
        description,
        date,
        priority,
      });
      await llist.save();
      res.status(200).json("task update");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const existinguser = await User.findOneAndUpdate(
      { email },
      { $pull: { List: req.params.id } }
    );

    if (existinguser) {
      const llist = await List.findByIdAndDelete(req.params.id);
      res.status(200).json("List deleted");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/geTask/:id", async (req, res) => {
  const list = await List.find({ user: req.params.id }).sort({ date: -1 });

  if (list.length != 0) {
    res.status(200).json({ list });
  } else {
    res.status(200).json({ message: "no task is created" });
  }
});

module.exports = router;
