const express = require("express");
const app = express();
const db = require("./connectionDB/condb");
require("dotenv").config();
const auth = require("./routes/auth");
const bodyParser = require("body-parser");
const rouList = require("./routes/List")
const cors = require("cors")
app.use(bodyParser.json());
app.use(cors())


app.use("/api/v1", auth);
app.use("/api/v2",rouList)
app.listen(4000);
