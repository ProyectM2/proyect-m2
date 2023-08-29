

module.exports.login = (req, res, next) => {
    res.render("users/login")
}

module.exports.register = (req, res, next) => {
    res.render("users/register")
}