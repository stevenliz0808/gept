const express = require("express");
const router = express.Router();

const db = require("../models");
const ListeningData = db.ListeningData;
const ListeningTestRecord = db.ListeningTestRecord;
const PretestData = db.PretestData

router.get("/create", (req, res) => {
  res.render("create-pretest");
});

router.get("/start/:round", (req, res) => {
  const { round } = req.params;
  res.render("start-pretest", { round });
});

router.get("/new/:round", (req, res, next) => {
  const { round } = req.params;
  return PretestData.findAll({
    attributes: [
      "ID",
      "Ans1",
      "Ans2",
      "Ans3",
    ],
    raw: true,
  })
    .then((pretestData) => {
      res.send(pretestData);
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