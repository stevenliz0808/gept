const express = require("express");
const router = express.Router();

const db = require("../models");
const ListeningData = db.ListeningData;

router.get("/test/create", (req, res) => {
  res.render("create-test");
});

router.get("/test/listening/start", (req, res) => {
  res.render("start-test");
});

router.get("/test/listening/new", (req, res) => {
  return ListeningData.findAll({
    attributes: [
      "ans1",
      "ans2",
      "ans3",
      "imgPath",
      "singleAns",
      "sort",
      "type",
      "voicePath",
      "GEPTround",
    ],
    where: { GEPTround: 1 },
    order: ["sort"],
    raw: true,
  })
    .then((listeningData) => {
      res.render("new-test", { data: listeningData });
    })
    .catch((err) => console.log(err));
});

router.get("/test/listening/report", (req, res) => {
  res.render("listening-report");
});

router.get("/test/reading/start", (req, res) => {
  res.render("start-test");
});

router.get("/test/reading/new", (req, res) => {
  return ListeningData.findAll({
    attributes: [
      "ans1",
      "ans2",
      "ans3",
      "imgPath",
      "singleAns",
      "sort",
      "type",
      "voicePath",
      "GEPTround",
    ],
    where: { GEPTround: 1 },
    order: ["sort"],
    raw: true,
  })
    .then((listeningData) => {
      res.render("new-", { listeningData });
    })
    .catch((err) => console.log(err));
});

router.get("/test/reading/report", (req, res) => {
  res.render("reading-report");
});

router.get("/test", (req, res) => {
  res.render("index");
});

router.get("/", (req, res) => {
  res.redirect("/test");
});

module.exports = router;
