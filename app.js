const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const app = express();
const dotenv = require("dotenv").config();
const { engine } = require("express-handlebars");
const moment = require("moment");

const router = require("./router");
const passport = require("./config/passport");
const handlebarsHelpers = require("./helpers/handlebars-helpers");
const hbsHandler = require("./middlewares/hbs-handler");
const errorHandler = require("./middlewares/error-handler");

const port = 3008;

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: handlebarsHelpers,
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.static("node_modules"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(hbsHandler);
app.use("/gepttest/listening/new", (req, res, next) => {
  delete req.session.enterTime;
  req.session.enterTime = moment();
  next();
});

app.use("/gepttest/listening/report", (req, res, next) => {
  if (req.session.enterTime) {
    const enterTime = req.session.enterTime;
    const exitTime = moment();
    const duration = moment.duration(exitTime.diff(enterTime));
    const minutes = Math.floor(duration.minutes());
    const seconds = Math.floor(duration.seconds());
    const formattedDuration = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    res.locals.formattedDuration = formattedDuration;
    console.log(`用户在网站上花了 ${formattedDuration} 。`);
    console.log(res.locals.formattedDuration);
  }
  next();
});
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
