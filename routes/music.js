var express = require("express");
var router = express.Router();
var Song = require("../models/song")

// Index Page
router.get("/", function(req, res) {
    // Get all songs from DB
    Song.find({}, function(err, songs) {
        if (err) {
            req.flash("error", "Something went wrong");
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
            req.flash("error", "Something went wrong");
            console.log(err);
        } else {
            req.flash("success", "Song succesfully created");
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
    Song.findById(req.params.id, function(err, foundSong) {
        if(err) {
            req.flash("error", "Something went wrong");
            console.log(err);
        } else {
            res.render("music/show", { song: foundSong });
        }
    });
});

// Edit Song Page
router.get("/:id/edit", isLoggedIn, function(req, res) {
    Song.findById(req.params.id, function(err, foundSong) {
        if (err) {
            req.flash("error", "Something went wrong");
            res.redirect("/music");
        } else {
            res.render("music/edit", {song: foundSong});
        }
    });
});

// Update Song Route
router.put("/:id", isLoggedIn, function(req, res) {
    // find and update the correct song
    Song.findByIdAndUpdate(req.params.id, req.body.song, function(err, updatedSong) {
        if (err) {
            req.flash("error", "Something went wrong");
            res.redirect("/music");
        } else {
            req.flash("success", "Song succesfully updated");
            res.redirect("/music/" + req.params.id);
        }
    });
    // redirect to the show page
})

// Destroy Song Route
router.delete("/:id", isLoggedIn, function(req, res) {
    Song.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            req.flash("error", "Something went wrong");
            res.redirect("/music/" + req.params.id);
        } else {
            req.flash("success", "Song succesfully deleted");
            res.redirect("/music");
        }
    });
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