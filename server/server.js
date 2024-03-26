const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

// Availabe routes
app.use("/api/auth", require("./routes/auth"));
app.use('/api/list', require('./routes/list'));

mongoose.connect(process.env.MONGO_URL)
.then(() => {
	console.log('connected to database');
})
.catch((e)=>{ 
	console.log("Something went wrong", e);
})


const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})