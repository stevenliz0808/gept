module.exports = (req, res, next) => {
  res.locals.userName = req.user ? req.user.name : null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
};
