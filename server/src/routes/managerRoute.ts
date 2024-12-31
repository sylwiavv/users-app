const managerController = require('../controllers/managerController')
const routerM = require('express').Router()

// router.get('/', userController.get)
routerM.post('/', managerController.createManager);

routerM.get('/', managerController.getManagers);
routerM.get('/:id', managerController.getManagerById); 


module.exports = routerM