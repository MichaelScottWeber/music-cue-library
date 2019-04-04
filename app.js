const express       = require("express"),
      mongoose      = require("mongoose"),
      bodyParser    = require("body-parser"),
      passport      = require("passport"),
      LocalStrategy = require("passport-local"),
      Song          = require("./models/song"),
      Comment       = require("./models/comment"),
      User          = require("./models/user"),
      seedDB        = require("./seeds"),
      app           = express();

// Connects to the local DB
mongoose.connect("mongodb://localhost/music_library", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Lucy always wins, forever",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to pass currentUser to all templates
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});



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
      res.render("music/index", { songs: songs, currentUser: req.user });
    }
  });
});

// "CREATE" Route - Creates a new song
app.post("/music", isLoggedIn, function(req, res) {
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
app.get("/music/new", isLoggedIn, function(req, res) {
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

// =======================
// ===== AUTH ROUTES =====
// =======================

// Show signup form
app.get("/register", function(req, res) {
  res.render("register");
});

// Handle signup logic
app.post("/register", function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register")
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/music");
    });
  });
});

// Show login form
app.get("/login", function(req, res) {
  res.render("login");
});

// Handle login logic
app.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/music",
    failureRedirect: "/login"
  }
  ),function(req, res) {

});

// Logout Route
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/music");
});

// Middleware for checking if logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}



app.listen(3000, function() {
  console.log("Server has started: localhost:3000")
});
