const express = require("express");
const router = express.Router();

const db = require("../models");
const ListeningData = db.ListeningData;

router.get("/create", (req, res) => {
  res.render("create-test");
});

router.get("/listening/start", (req, res) => {
  res.render("start-test");
});

router.get("/listening/new", (req, res) => {
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
    .catch((err) => next(err));
});

router.get("/listening/report", (req, res) => {
  res.render("listening-report");
});

router.get("/reading/start", (req, res) => {
  res.render("start-test");
});

router.get("/reading/new", (req, res) => {
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

router.get("/reading/report", (req, res) => {
  res.render("reading-report");
});

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router
