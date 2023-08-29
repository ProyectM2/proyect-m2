const mongoose =  require("mongoose");

mongoose
 .connect("mongodb+srv://polifonico:OmM4R726gSQiA3DV@pm.lv7cxiu.mongodb.net/")
 .then(() => console.info("Connected to DBATLAS")
 )
 .catch((error) => console.error("Mongoose error conecting database", error))