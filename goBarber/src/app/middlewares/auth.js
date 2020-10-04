module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // Disponibilizando objeto com dados da sessão para todos arquivos njk
    res.locals.user = req.session.user
    return next()
  }

  return res.redirect('/')
}
