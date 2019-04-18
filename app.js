var express        = require("express"),
    mongoose       = require("mongoose"),
    bodyParser     = require("body-parser"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    User           = require("./models/user"),
    seedDB         = require("./seeds");

var app = express();

// Requiring routes
    musicRoutes   = require("./routes/music"),
    indexRoutes   = require("./routes/index");

// Connects to the local DB
mongoose.connect("mongodb://localhost/music_library", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

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
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/music", musicRoutes);

// // For local hosting
// app.listen(3000, function() {
//   console.log("Server has started: localhost:3000")
// });

app.listen(process.env.PORT, process.env.IP);
