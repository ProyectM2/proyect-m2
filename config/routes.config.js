const express = require("express");
const router = express.Router();
const home = require("../controllers/home.controller")
const user = require("../controllers/user.controller")
const secure = require('../middlewares/secure.mid.js');
const reserve = require("../controllers/travel.controller")

router.get("/", (req, res) => res.redirect("/home"));

router.get("/home", home.home)

router.get("/login", user.login)
router.post('/login', user.doLogin);
// router.get('/profile', secure.isAuthenticated, user.profile);

router.get("/register", user.register)
router.post("/register", user.doRegister)

router.get("/reserve", reserve.reserve)

module.exports = router