const express = require("express");
const router = express.Router();

const db = require("../models");
const ListeningTestRecord = db.ListeningTestRecord;
const PretestData = db.PretestData;
const GrammarList = db.GrammarList;
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
        }),
      );
    })
    .then((data) => {
      const pretestData = data.filter(
        (item) => item !== null
      );
      res.render("new-pretest", { data: pretestData });
    })
    .catch((err) => next(err));
});

router.post("/report", (req, res, next) => {
  const userId = req.user.ID;
  const { myAns, checkedAns, level, round } = req.body;
  const currentDate = new Date().toLocaleString();

  return ListeningTestRecord.create({
    StuAccID: userId,
    Round: round,
    Level: level,
    MyAns: myAns,
    CheckedAns: checkedAns,
    createDate: currentDate,
  })
    .then(() => {
      res.redirect("/pretest/report");
    })
    .catch((err) => next(err));
});

router.get("/report", (req, res, next) => {
  const userId = req.user.ID;

  return ListeningTestRecord.findAll({
    attributes: ["Round", "Level", "MyAns", "CheckedAns", "createDate"],
    where: {
      StuAccID: userId,
    },
    order: ["Round"],
    raw: true,
  })
    .then((records) => {
      const thisRound = records.length;
      const thisRecord = records[thisRound - 1];
      const level = thisRecord.Level;
      const checkedAns = thisRecord.CheckedAns;
      const myAns = thisRecord.MyAns;
      const correctAns = level / 4;
      const result = level < 72 ? "未通過聽力檢測!" : "通過聽力檢測!";

      const ansDetailArray1 = [];
      const ansDetailArray2 = [];
      const ansDetailArray3 = [];
      const ansDetailArray4 = [];
      const myAnsArray = myAns.split("").map((num) => {
        const letters = "ABC";
        return letters[num - 1];
      });
      const checkedAnsArray = checkedAns.split("");

      const firstAccuracy = ((records[0].Level / 120) * 100).toFixed(1);

      const thisAccuracy =
        thisRound > 1 ? ((thisRecord.Level / 120) * 100).toFixed(1) : 0;

      const lastAccuracy =
        thisRound > 2
          ? ((records[thisRound - 2].Level / 120) * 100).toFixed(1)
          : 0;

      const currentAccuracy = thisRound == 1 ? firstAccuracy : thisAccuracy;

      const firstDate = records[0].createDate.toLocaleString("zh-TW", {
        timeZone: "UTC",
      });

      const thisDate =
        thisRound > 1
          ? thisRecord.createDate.toLocaleString("zh-TW", {
              timeZone: "UTC",
            })
          : "--";

      const lastDate =
        thisRound > 2
          ? records[thisRound - 2].createDate.toLocaleString("zh-TW", {
              timeZone: "UTC",
            })
          : "--";

      const currentDate = thisRound == 1 ? firstDate : thisDate;

      let level1 = 0,
        level2 = 0,
        level3 = 0,
        level4 = 0;
      for (let i = 0; i < 5; i++) {
        ansDetailArray1[i] = {
          sort: i + 1,
          myAns: myAnsArray[i],
          checkedAns: checkedAnsArray[i],
        };
        if (checkedAnsArray[i] === "O") level1 += 4;
      }
      for (let i = 5; i < 15; i++) {
        ansDetailArray2[i] = {
          sort: i + 1,
          myAns: myAnsArray[i],
          checkedAns: checkedAnsArray[i],
        };
        if (checkedAnsArray[i] === "O") level2 += 4;
      }
      for (let i = 15; i < 25; i++) {
        ansDetailArray3[i] = {
          sort: i + 1,
          myAns: myAnsArray[i],
          checkedAns: checkedAnsArray[i],
        };
        if (checkedAnsArray[i] === "O") level3 += 4;
      }
      for (let i = 25; i < 30; i++) {
        ansDetailArray4[i] = {
          sort: i + 1,
          myAns: myAnsArray[i],
          checkedAns: checkedAnsArray[i],
        };
        if (checkedAnsArray[i] === "O") level4 += 4;
      }

      res.render("listening-report", {
        level,
        level1,
        level2,
        level3,
        level4,
        currentAccuracy,
        thisAccuracy,
        lastAccuracy,
        firstAccuracy,
        correctAns,
        result,
        ansDetailArray1,
        ansDetailArray2,
        ansDetailArray3,
        ansDetailArray4,
        currentDate,
        thisDate,
        lastDate,
        firstDate,
      });
    })
    .catch((err) => next(err));
});

router.get("/", (req, res) => {
  res.redirect("/pretest/create");
});

module.exports = router;
