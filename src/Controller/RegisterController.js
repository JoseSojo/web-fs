/*
  * CONTROLLER REGISTER
  * @router('/register') name='Register'
*/

const express = require('express');
const router = express.Router();
const {SessionOff} = require('../lib/security.js');
const passport = require('passport');

const {register} = require('../From/Inputs.js');

/*
 * PETICION GET
*/
router.get('/register',SessionOff, (req, res) => {
  res.render('Authentication/Register.hbs', {
    name: 'Register',
    inputs: register
  });
})

/*
 * PETICION POST
*/
router.post('/register', passport.authenticate('local.register', {
    successRedirect: '/dashboard',
    failureRedirect: '/register',
    failureFlash: true
}))

module.exports = router;
