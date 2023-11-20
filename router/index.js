const express = require("express");
const router = express.Router();

const db = require("../models");
const ListeningData = db.ListeningData;

router.get("/test/create", (req, res) => {
  res.render("create-test");
});

router.get("/test/start", (req, res) => {
  res.render("start-test");
});

router.get("/test/new", (req, res) => {
  return ListeningData.findAll({
    raw: true,
  })
    .then((listeningData) => res.render("listening-test", { listeningData }))
    .catch((err) => console.log(err));
});

router.get("/test", (req, res) => {
  res.render("index");
});

router.get("/", (req, res) => {
  res.redirect("/test");
});

module.exports = router;
