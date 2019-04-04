var express = require("express");
var router = express.Router({mergeParams: true});
var Song = require("../models/song");
var Comment = require("../models/comment");


// // NEW COMMENT FORM PAGE - not needed anymore since the form was moved to the SHOW page
// router.get("/new", function(req, res) {
//     // find song by id
//     Song.findById(req.params.id, function(err, song) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("comments/new", {song: song});
//         }
//     })
// });
  
// New Comment POST Route
router.post("/", function(req, res) {
    // lookup song using id
    Song.findById(req.params.id, function(err, song) {
        if (err) {
            console.log(err);
            res.redirect("/music");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // connect new comment to song
                    song.comments.push(comment);
                    song.save();
                    // redirect back tosong show page
                    res.redirect("/music/" + song._id)
                }
            });
        }
    });
});
  
// Middleware for checking if logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;