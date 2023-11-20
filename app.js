const express = require("express");
const app = express();
const { engine } = require("express-handlebars");

const router = require("./router");
const handlebarsHelpers = require("./helpers/handlebars-helpers")

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

app.use(router);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
