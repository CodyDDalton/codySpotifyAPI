const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT;

const DATABASE_URL= process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => {
    console.log("Database connection established")
})

app.use(cors());

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})