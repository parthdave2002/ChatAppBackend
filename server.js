require('dotenv').config();
const express = require('express')
const ConnectDB = require("./config/db");
const cors = require('cors');
const cookieParser = require("cookie-parser")
const app = express();
const PORT = process.env.PORT || 3000;
const indexRoute = require("./routes/index")

ConnectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true, parameterLimit:2 }));
app.use(cookieParser())
app.use(cors())

app.use("/api", indexRoute)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});