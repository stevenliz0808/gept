module.exports = (err, req, res, next) =>{
  console.error(err)
  res.redirect("back")

  next(err)
}
