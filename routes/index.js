var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")


// Root/Landing Page
router.get("/", function(req, res) {
    res.render("landing");
});
  
// Singup Form Page - keep this hidden from view!
router.get("/register", function(req, res) {
    res.render("register");
  });
  
// Signup Post Route - handles signup logic
router.post("/registerr", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Succesfully signed up");
            res.redirect("/music");
        });
    });
});

// Login Page
router.get("/login", function(req, res) {
    res.render("login");
});

// Login Post Route - handles login logic
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/music",
    successFlash: "Succesfully logged in!",
    failureRedirect: "/login",
    failureFlash: "Something went wrong. Check your username and password and try again."
}
), function(req, res) {
    req.flash("success", "Succesfully logged in");
});

// Logout Route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Succesfully logged out");
    res.redirect("/music");
});

// Middleware for checking if logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please login first");
    res.redirect("/login");
}

  
module.exports = router;