const express = require("express");
const router = express.Router();
const home = require("../controllers/home.controller")
const user = require("../controllers/user.controller")


router.get("/", (req, res) => res.redirect("/home"));

router.get("/home", home.home)

router.get("/login", user.login)

router.get("/register", user.register)
router.post("/register", user.doRegister)


module.exports = router