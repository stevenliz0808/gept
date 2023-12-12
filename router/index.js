const express = require("express");
const router = express.Router();
const passport = require("passport");
const gepttest = require("./gepttest");
const pretest = require("./pretest");
const api = require("./api")
const authHandler = require("../middlewares/auth-handler");

const db = require("../models");
const User = db.LoginData;

router.use("/gepttest", authHandler, gepttest);
router.use("/pretest", pretest);
router.use("/api", api)

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/gepttest",
    failureRedirect: "/",
  })
);

router.get("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    req.flash("success", "登出成功");
    res.redirect("/");
  });
});

router.post("/user/confirm", (req, res) => {
  const id = req.user.ID;
  const { name, nameEng, city, town } = req.body;
  console.log(name, nameEng, city, town);
  return User.findByPk(id)
    .then((user) => {
      if (!user) {
        throw new Error("用戶不存在");
      }
      return user.update({
        Name: name,
        NameEng: nameEng,
        City: city,
        Town: town,
      });
    })
    .then(() => res.redirect("/gepttest/listening/start"))
    .catch((err) => next(err));
});

router.get("/", (req, res) => {
  const isLogout = true
  res.render("index", { isLogout });
});

module.exports = router;
