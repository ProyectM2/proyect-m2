const hbs = require("hbs")

hbs.registerPartials(__dirname + "/../views/partials");

hbs.registerHelper('isAdmin', function(user, options) {
    return user.admin ? options.fn(this) : options.inverse(false)
})