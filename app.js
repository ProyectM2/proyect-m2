const express = require("express");
const app = express();
const morgan = require("morgan");
const hbs = require("hbs");

app.use('/styles', express.static('styles'));

require("./config/db.config");

require("./config/hbs.config");

// Views engine
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.urlencoded());
app.use(morgan('dev'));


//session
const sessionconfig = require("./config/session.config")
app.use(sessionconfig.session);
app.use(sessionconfig.Loadsessionuser)

// Routes
const router = require("./config/routes.config");
app.use(router);



app.listen(3000, () => console.info("Ready"));
