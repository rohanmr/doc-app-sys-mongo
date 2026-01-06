const express = require('express')
require('dotenv').config()
const connectDB = require("./config/db");

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send({ msg: "Hello World" })
})

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
};

startServer();