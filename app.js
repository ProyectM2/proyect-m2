const express = require("express");
const app = express();
const morgan = require("morgan");
const hbs = require("hbs");
const flash = require('connect-flash');

app.use(express.static("public"))

require("./config/db.config");

require("./config/hbs.config");

// Views engine
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


//session
const sessionconfig = require("./config/session.config")
app.use(sessionconfig.session);
app.use(sessionconfig.Loadsessionuser)
app.use(flash());

app.use((req, res, next) => {
  res.locals.navigationPath = req.path;
  const fashData = req.flash('data');
  console.log(fashData);
  if (fashData?.length > 0) {
    const data = JSON.parse(fashData[0]);
    Object.keys(data)
      .forEach((key) => res.locals[key] = data[key])
  }
  next();
})

// Routes
const router = require("./config/routes.config");
app.use(router);



app.listen(3000, () => console.info("Ready"));
