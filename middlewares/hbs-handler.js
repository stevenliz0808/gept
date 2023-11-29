module.exports = (req, res, next) => {
  res.locals.userName = req.user ? req.user.Name : null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
};