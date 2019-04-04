var express = require("express");
var router = express.Router();
var Song = require("../models/song")
var Comment = require("../models/comment")

// Index Page
router.get("/", function(req, res) {
    // Get all songs from DB
    Song.find({}, function(err, songs) {
        if (err) {
            console.log(err);
        } else {
            res.render("music/index", { songs: songs, currentUser: req.user });
        }
    });
});
  
// Create Route - handles logic for creating a new Song
router.post("/", isLoggedIn, function(req, res) {
    // get data from form and add to songs array
    let title = req.body.title;
    let image = req.body.image;
    let audio = req.body.audio;
    let desc = req.body.description;
    let tags = req.body.tags;
    let newSong = {
        title: title,
        image: image,
        audio: audio,
        description: desc,
        tags: tags
    };
  
    // Create a new song and save to DB
    Song.create(newSong, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to music page
            res.redirect("/music");
        }
    });
});
  
// New Song Page
router.get("/new", isLoggedIn, function(req, res) {
    res.render("music/new");
});
  
// Show Page - displays info about one song
router.get("/:id", function(req, res) {
    // find the song with provided ID
    Song.findById(req.params.id).populate("comments").exec( function(err, foundSong) {
        if(err) {
            console.log(err);
        } else {
            res.render("music/show", { song: foundSong });
        }
    });
    req.params.id
});

// Middleware for checking if logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;