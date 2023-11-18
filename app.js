const express = require("express");
const app = express();
const { engine } = require("express-handlebars");

const port = 3000;

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/test/create", (req, res) => {
  res.render("create-test");
});

app.get("/test/start", (req, res) => {
  res.render("start-test");
});

app.get("/test", (req, res) => {
  res.render("index");
});

app.get("/", (req, res) => {
  res.redirect("/test");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
