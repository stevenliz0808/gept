const express = require("express");
const router = express.Router();
const test = require("./test");

const db = require("../models")
const User = db.TPELoginData

router.use("/test", test);

router.post("/user/confirm", (req, res) => {
  const { name, nameEng, city, area } = req.body;
  console.log(name, nameEng, city, area);
  return User.findByPk()
    .then(() => res.redirect("/test/listening/start"))
    .catch((err) => next(err));
});

router.get("/", (req, res) => {
  res.redirect("/test");
});

module.exports = router;
