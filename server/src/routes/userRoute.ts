const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/', userController.getUsers)
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById); 
router.patch('/:id', userController.updateUser); 

module.exports = router