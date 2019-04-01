const express    = require("express"),
      mongoose   = require("mongoose"),
      bodyParser = require("body-parser"),
      Song       = require("./models/song"),
      Comment    = require("./models/comment"),
      seedDB     = require("./seeds"),
      app        = express();

// Connects to the local DB
mongoose.connect("mongodb://localhost/music_library", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();


// Landing Page
app.get("/", function(req, res) {
  res.render("landing");
});

// "INDEX" Route - displays all filtered music
app.get("/music", function(req, res) {
  // Get all songs from DB
  Song.find({}, function(err, songs) {
    if (err) {
      console.log(err);
    } else {
      res.render("music/index", { songs: songs });
    }
  });
});

// "CREATE" Route - Creates a new song
app.post("/music", function(req, res) {
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

// "New" Route - displays a form for creating a new song
app.get("/music/new", function(req, res) {
  res.render("music/new");
});

// "SHOW" Route - displays info about one song
app.get("/music/:id", function(req, res) {
  // find the song with provided ID
  Song.findById(req.params.id).populate("comments").exec( function(err, foundSong) {
    if(err) {
      console.log(err);
    } else {
      res.render("music/show", { song: foundSong });
    }
  });
  req.params.id
  // render the show template for that song
});

// ==============================
// COMMENTS ROUTES
// ==============================

app.get("/music/:id/comments/new", function(req, res) {
  // find song by id
  Song.findById(req.params.id, function(err, song) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {song: song});
    }
  })
});

app.post("/music/:id/comments", function(req, res) {
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


app.listen(3000, function() {
  console.log("Server has started: localhost:3000")
});
