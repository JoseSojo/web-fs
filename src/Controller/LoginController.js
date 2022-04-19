/*
  * CONTROLLER REGISTER
  * @router('/register') name='Register'
  * @session: false
*/

const express = require('express');
const router = express.Router();
const {SessionOff} = require('../lib/security.js');
const passport = require('passport');

const {login} = require('../From/Inputs.js');

/*
 * PETICION GET
*/
router.get('/login',SessionOff,(req, res) => {
  res.render('Authentication/Login.hbs', {
    name: 'Login',
    inputs: login
  });
});

/*
 * PETICION POST
*/
router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;
