var express       = require("express"),
    mongoose      = require("mongoose"),
    bodyParser    = require("body-parser"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Song          = require("./models/song"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds"),
    app           = express();

// Requiring routes
var commentRoutes = require("./routes/comments"),
    musicRoutes   = require("./routes/music"),
    indexRoutes   = require("./routes/index");

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

app.use("/", indexRoutes);
app.use("/music", musicRoutes);
app.use("/music/:id/comments", commentRoutes);

app.listen(3000, function() {
  console.log("Server has started: localhost:3000")
});

