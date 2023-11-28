const express = require("express");
const router = express.Router();
const passport = require("passport");
const test = require("./test");

const db = require("../models");
const User = db.LoginData;

router.use("/test", test);

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/test",
    failureRedirect: "/failure",
  })
);

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
