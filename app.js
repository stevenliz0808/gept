const express = require("express");
const session = require("express-session");
const app = express();
const dotenv = require("dotenv").config()
const { engine } = require("express-handlebars");

const router = require("./router");
const passport = require("./config/passport")
const handlebarsHelpers = require("./helpers/handlebars-helpers");
const errorHandler = require("./middlewares/error-handler");

const port = 3000;

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
app.use(router);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
