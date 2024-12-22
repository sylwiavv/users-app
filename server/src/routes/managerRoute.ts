const managerController = require('../controllers/managerController')
const routerM = require('express').Router()

// router.get('/', userController.get)
routerM.post('/', managerController.createManager);

module.exports = routerM