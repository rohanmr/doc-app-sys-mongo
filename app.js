const express = require('express')
require('dotenv').config()
const connectDB = require("./config/db");
const cors = require('cors')
const app = express()
const userRoute = require('./routes/userRoute')
app.use(cors())
app.use(express.json())


app.use("/api/user", userRoute)




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