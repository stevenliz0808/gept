const express = require("express");
const router = express.Router();

const db = require("../models");
const { Schedule, StudyPlanFourHours } = db

router.get("/", (req, res, next) => {
  const userId = "123";
  let startDate
  return Schedule.findOne({
    where: {
      stuAccId: userId,
    },
    raw: true,
  })
    .then((schedule) => {
      startDate = schedule.startDate
      return StudyPlanFourHours.findByPk(schedule.level, {
        raw: true
      })
    })
    .then((plan) => {
      const finalDate = startDate.setDate(startDate.getDate()+(22*7))
      res.render("schedule", {startDate , finalDate });
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  const userId = "123";
  const { startDate, version, level } = req.body;
  return Schedule.create({
    stuAccId: userId,
    level,
    startDate,
    version,
  })
    .then(() => {
      res.redirect("/schedule");
    })
    .catch((err) => next(err));
});

module.exports = router;
