const express = require("express");
const router = express.Router();
const home = require("../controllers/home.controller")
const user = require("../controllers/user.controller")
const secure = require('../middlewares/secure.mid.js');
// const reserve = require("../controllers/travel.controller")
const travel = require("../controllers/travel.controller")
const ship = require("../controllers/ship.controller")
const reserve = require("../controllers/reserve.controller")



router.get("/", (req, res) => res.redirect("/home"));

router.get("/home", home.home)

router.get("/login", user.login)
router.post('/login', user.doLogin);

router.get('/travels/:id', secure.isAuthenticated, travel.accept)
router.post('/travels/:id', secure.isAuthenticated, travel.doAccept)
router.get('/cpanel', secure.isAuthenticated , user.admin)
router.post('/cpanel/:id', secure.isAuthenticated, travel.travelDelete)
router.post('/cpanel', secure.isAuthenticated, ship.shipDoCreate)
router.post('/home', secure.isAuthenticated, travel.travelDoCreate)

router.get('/profile', secure.isAuthenticated, user.profile);

router.get("/register", user.register)
router.post("/register", user.doRegister)

router.get("/reserve", secure.isAuthenticated, reserve.reserve)
router.post("/logout", secure.isAuthenticated, user.logout)

module.exports = router