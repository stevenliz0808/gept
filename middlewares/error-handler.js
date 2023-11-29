module.exports = (err, req, res, next) =>{
  if (err instanceof Error) {
    req.flash("error", `${err.message}`);
  }
  else {
    req.flash("error", `${err}`)
  }
  console.error(err)
  res.redirect("back")

  next(err)
}
