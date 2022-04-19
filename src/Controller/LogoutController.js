/*
  * CONTROLLER REGISTER
  * @router('/register') name='Register'
*/

const express = require('express');
const router = express.Router();
const {SessionOn} = require('../lib/security.js');

/*
 * PETICION GET
*/
router.get('/logout',SessionOn, (req, res)=>{
  req.logout();
  res.redirect('/login');
})

module.exports = router;
