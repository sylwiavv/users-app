const userSignIn = require('../controllers/userSignIn')
const routerSignIn = require('express').Router()

routerSignIn.post('/', userSignIn.createSignInUser);

module.exports = routerSignIn
