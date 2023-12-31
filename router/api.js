const express = require("express");
const router = express.Router();

const db = require("../models");
const PretestData = db.PretestData;
const PretestRecord = db.PretestRecord;
const GrammarList = db.GrammarList;
const { Op, literal } = require("sequelize");

router.get("/pretest/:round", (req, res, next) => {
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
      res.json({ pretestData, round });
    })
    .catch((err) => next(err));
});

router.post("/pretest/report", (req, res, next) => {
  const userId = req.user.id;
  const { myAnsArray, myQuesArray, level } = req.body;

  return PretestRecord.create({
    userId,
    level,
    myQues: JSON.stringify(myQuesArray),
    myAns: JSON.stringify(myAnsArray),
  })
    .then(() => res.json({ redirect: "/pretest/report" }))
    .catch((err) => next(err));
});

module.exports = router;
