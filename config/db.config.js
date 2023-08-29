const mongoose =  require("mongoose");
require('dotenv').config();


mongoose
 .connect(process.env.URL)
 .then(() => console.info("Connected to DBATLAS")
 )
 .catch((error) => console.error("Mongoose error conecting database", error))