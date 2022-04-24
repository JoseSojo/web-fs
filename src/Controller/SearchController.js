/*
  * CONTROLLER REGISTER
  * @router('/search') name='Search'
  * @session true
*/

const express = require('express');
const router = express.Router();
const pool = require('../../database.js');
const {SessionOn} = require('../lib/security.js');
const passport = require('passport');

const {register} = require('../From/Inputs.js');

/*
 * PETICION GET
*/
router.get('/search',SessionOn, (req, res) => {
  res.render('ViewSession/Search.hbs', {
    name: 'Search'
  });
});

router.get('/search/:id',SessionOn, async (req, res) => {
  const {id} = req.params;
  const userResult = await pool.query('SELECT * FROM fs_user WHERE id = ?', [id]);
  const gammerResult = await pool.query('SELECT * FROM fs_game WHERE user_id = ?', [id]);

  res.render('ViewSession/Search.hbs', {
    name: 'Search',
    gammer: gammerResult[0],
    user: userResult[0]
  });
});

router.post('/search/:name',SessionOn, async (req, res) => {
  const {name} = req.params;
  const rows = await pool.query(`SELECT * FROM fs_user WHERE fs_username LIKE '%${name}%'`);
  const send = JSON.stringify(rows);
  res.json(send);
});

module.exports = router;
