const express = require("express");
const app = express();
const morgan = require("morgan");
const hbs = require("hbs");

require("./config/db.config");

require("./config/hbs.config");

// Views engine
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

// Routes
const router = require("./config/routes.config");
app.use(router);

app.listen(3000, () => console.info("Ready")); 
