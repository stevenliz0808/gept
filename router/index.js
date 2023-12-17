const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const gepttest = require("./gepttest");
const pretest = require("./pretest");
const schedule = require("./schedule");
const api = require("./api");
const authHandler = require("../middlewares/auth-handler");

const { LoginData } = require("../models");

router.use("/gepttest", authHandler, gepttest);
router.use("/pretest", authHandler, pretest);
router.use("/api", api);
router.use("/schedule", schedule);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, (err) => {
    if (!err) {
      req.flash("success", "登入成功");
    }
    res.redirect("/");
  });
});


router.post("/signup", (req, res, next) => {
  const { name, password } = req.body;
  return LoginData.findOne({
    where: { name },
    raw: true,
  })
    .then((user) => {
      if (user) throw new Error("用戶已存在");
      return bcrypt.hash(password, 5);
    })
    .then((hash) => {
      LoginData.create({
        name,
        password: hash,
      });
    })
    .then(() => {
      req.flash("success", "註冊成功");
      res.redirect("/");
    })
    .catch((err) => next(err));
});

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

router.get("/", (req, res) => {
  const isLogout = true;
  res.render("index", { isLogout });
});

module.exports = router;
