const express = require("express");
const app = express();
const db = require("./connectionDB/condb");
require("dotenv").config()

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

// app.post("/", async (req, res) => {
//   try {
//     const data = req.body;
//     const newtopAnime = new topanime(data);
//     const savednewtopAnime = await newtopAnime.save();
//     res.status(200).json(savednewtopAnime);

//   } catch (error) {
//     res.status(500).json(error, "internal server error");
//   }
// });

app.get("/", (req, res) => {
  res.json("hallo world");
});

app.listen(3000);
