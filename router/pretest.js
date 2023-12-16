const express = require("express");
const router = express.Router();

const db = require("../models");
const PretestData = db.PretestData;
const GrammarList = db.GrammarList;
const PretestRecord = db.PretestRecord;
const StudyPlanFourHours = db.StudyPlanFourHours;
const { Op, literal } = require("sequelize");

router.get("/create", (req, res) => {
  res.render("create-pretest");
});

router.get("/start/:round", (req, res) => {
  const { round } = req.params;
  res.render("start-pretest", { round });
});

router.get("/new/:round", (req, res, next) => {
  const { round } = req.params;
  const grammarLevel = [
    { start: 1, end: 8 }, //第1級
    { start: 9, end: 17 }, //第2級
    { start: 18, end: 25 },
    { start: 26, end: 32 },
    { start: 33, end: 40 },
    { start: 41, end: 47 },
    { start: 48, end: 54 },
    { start: 55, end: 63 },
    { start: 64, end: 70 },
    { start: 71, end: 80 }, //第10級
  ];
  const startId = grammarLevel[round - 1].start;
  const endId = grammarLevel[round - 1].end;

  return GrammarList.findAll({
    where: {
      ID: {
        [Op.between]: [startId, endId],
      },
    },
    raw: true,
  })
    .then((grammarData) => {
      let typeArray = [];
      grammarData.forEach((data) => {
        if (data.Gram1) {
          if (data.Gram11) {
            for (let i = 11; i <= 16; i++) {
              const gramKey = `Gram${i}`;

              if (data[gramKey]) {
                typeArray.push({
                  ExamType1: data.Gram1,
                  ExamType2: data[gramKey],
                });
              } else break;
            }
          } else {
            typeArray.push({
              ExamType1: data.Gram1,
            });
          }
        }
        if (data.Gram2) {
          if (data.Gram21) {
            for (let i = 21; i <= 26; i++) {
              const gramKey = `Gram${i}`;

              if (data[gramKey]) {
                typeArray.push({
                  ExamType1: data.Gram2,
                  ExamType2: data[gramKey],
                });
              } else break;
            }
          } else {
            typeArray.push({
              ExamType1: data.Gram2,
            });
          }
        }
      });

      return Promise.all(
        typeArray.map((type) => {
          return PretestData.findOne({
            attributes: [
              "ID",
              "ExamName",
              "Ans1",
              "Ans2",
              "Ans3",
              "Ans4",
              "StandardAns",
            ],
            where: type,
            order: literal("NEWID()"),
            raw: true,
          });
        })
      );
    })
    .then((data) => {
      const pretestData = data.filter((item) => item !== null);
      res.render("new-pretest", { data: pretestData, round });
    })
    .catch((err) => next(err));
});

router.get("/report", (req, res, next) => {
  // const userId = req.user.ID;
  let createDate;
  return PretestRecord.findOne({
    where: {
      level: 9,
    },
    raw: true,
  })
    .then((record) => {
      const level = record.level;
      createDate = new Date(record.createDate).toISOString().split("T")[0];
      return StudyPlanFourHours.findByPk(level, { raw: true });
    })
    .then((plan) => {
      const { grammarWeek, reviewWeek, wordPerWeek } = plan;
      const totalWeek = grammarWeek + reviewWeek;
      const grammarHour = grammarWeek * 4;
      const reviewHour = reviewWeek * 4;
      const totalHour = totalWeek * 4;
      const grammarWeek2 = grammarWeek * 2;
      const reviewWeek2 = reviewWeek * 2;
      const totalWeek2 = totalWeek * 2;
      const wordPerWeek2 = wordPerWeek / 2;
      res.render("pretest-report", {
        plan,
        totalWeek,
        grammarHour,
        reviewHour,
        totalHour,
        createDate,
        grammarWeek2,
        reviewWeek2,
        totalWeek2,
        wordPerWeek2,
      });
    });
});

router.get("/", (req, res) => {
  res.redirect("/pretest/create");
});

module.exports = router;
