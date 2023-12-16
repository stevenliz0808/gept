module.exports = (req, res, next) => {
  res.locals.userName = req.user ? req.user.Name : null;
  res.locals.userNameEng = req.user ? req.user.NameEng : null;
  res.locals.userCity = req.user ? req.user.City : null;
  res.locals.userTown = req.user ? req.user.Town : null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
};
