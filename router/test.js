const express = require("express");
const router = express.Router();

const db = require("../models");
const ListeningData = db.ListeningData;
const ListeningTestRecord = db.ListeningTestRecord;
const LoginData = db.LoginData;

router.get("/create", (req, res) => {
  const id = req.user.ID;
  return LoginData.findByPk(id, { raw: true }).then((user) => {
    res.render("create-test", { user });
  });
});

router.get("/listening/start", (req, res) => {
  res.render("start-test");
});

router.get("/listening/new", (req, res, next) => {
  const id = req.user.ID;
  let GEPTround = 0
  ListeningTestRecord.findAll({
    attributes: ["Round"],
    where: { StuAccID: id },
    order: [["Round", "DESC"]],
    raw: true,
  })
    .then((rounds) => {
      GEPTround = rounds.length ? rounds[0].Round + 1 : 1;
      if (GEPTround > 9) throw new Error("所有試題皆已完成!")
      return ListeningData.findAll({
        attributes: [
          "ID",
          "ans1",
          "ans2",
          "ans3",
          "imgPath",
          "standardAns",
          "sort",
          "type",
          "voicePath",
          "GEPTround",
        ],
        where: { GEPTround },
        order: ["sort"],
        raw: true,
      });
    })
    .then((listeningData) => {
      res.render("new-test", { data: listeningData, GEPTround });
    })
    .catch((err) => next(err));
});

router.post("/listening/report", (req, res, next) => {
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
      const accuracy = ((level / 120) * 100).toFixed(1);
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
        accuracy,
        correctAns,
        result,
        ansDetailArray1,
        ansDetailArray2,
        ansDetailArray3,
        ansDetailArray4,
        currentDate,
      });
      console.log(currentDate);
    })
    .catch((err) => next(err));
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
      "standardAns",
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
  const isIndex = 1;
  res.render("index", { isIndex });
});

module.exports = router;
