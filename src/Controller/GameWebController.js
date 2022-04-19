/*
  * CONTROLLER PROFILE
  * @router('/profile') name='Profile'
  * @session(true)
*/

const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../../database.js');
const helpers = require('../lib/helpers.js');
const {SessionOn} = require('../lib/security.js');
const {data, password} = require('../From/Inputs.js');

/*
 * PETICION GET
*/
router.get('/game', SessionOn,async (req, res) => {
  const stast = await pool.query('SELECT * FROM fs_game WHERE user_id = ?', [req.user.id]);
  const gammer = stast[0];
  const dataGammer = [
    {
      title: 'Healt',
      value: gammer.fs_heal,
      title2: 'Level',
      value2: gammer.fs_lv
    },
    {
      title: 'Attack',
      value: gammer.fs_at,
      title2: 'Defense',
      value2: gammer.fs_def
    },
    {
      title: 'Velocity',
      value: gammer.fs_vel,
      title2: 'Mana',
      value2: gammer.fs_mana
    },
  ];
  res.render('ViewSession/Profile.hbs', {
    name: 'Profile',
    tab: 'Profile',
    dataGammer: dataGammer
  });
});

module.exports = router;
