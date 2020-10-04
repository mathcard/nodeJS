const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionsController')

// Liberando as mensagens de flash para todas página njk
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')
  return next()
})

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

// Validando autenticação em todas rotas que começam com app
routes.use('/app', authMiddleware)

routes.get('/app/logout', SessionController.destroy)

// Poderia adidionar a autencação adicionando o middleware como segundo parametro
routes.get('/app/dashboard', (req, res) => {
  console.log(req.session.user)
  return res.render('dashboard')
})

module.exports = routes
