const express = require('express')
const route = express.Router()

const homeController = require('./src/controller/homeControllers')
const loginController = require('./src/controller/loginControllers')
const contatoController = require('./src/controller/contatoController')
const middleware = require('./src/middlewares/middleware')

//rotas de home
route.get('/', homeController.index)

//rotas de login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

//rotas de contato
route.get('/contato/index', middleware.checkLogin, contatoController.index)
route.post('/contato/register', middleware.checkLogin, contatoController.register)
route.get('/contato/index/:id', middleware.checkLogin, contatoController.editIndex)
route.post('/contato/edit/:id', middleware.checkLogin, contatoController.edit)
route.get('/contato/delete/:id', middleware.checkLogin, contatoController.delete)

module.exports = route