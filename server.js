const express = require("express");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

const AuthRoutes = require('./routes/authRoutes.js');
app.use('/api', cors(), AuthRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})