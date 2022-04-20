/*
  * CONTROLLER GAME WEB
  * @router('/game') name='Game'
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
      id: gammer.id,
      user_id: req.user.id,
      name: 'fs_heal'
    },{
      title: 'Attack',
      value: gammer.fs_at,
      id: gammer.id,
      user_id: req.user.id,
      name: 'fs_at'
    },{
      title: 'Defense',
      value: gammer.fs_def,
      id: gammer.id,
      user_id: req.user.id,
      name: 'fs_def'
    },{
      title: 'Velocity',
      value: gammer.fs_vel,
      id: gammer.id,
      user_id: req.user.id,
      name: 'fs_vel'
    },{
      title: 'Mana',
      value: gammer.fs_mana,
      id: gammer.id,
      user_id: req.user.id,
      name: 'fs_mana'
    }
  ];
  res.render('ViewSession/GameWeb.hbs', {
    name: 'Game',
    dataGammer: dataGammer
  });
});

router.post('/plus-stast/:id', SessionOn, async (req, res) =>{
  const id = req.user.id;
  const {camp} = req.body;
  const stasts = await pool.query('SELECT * FROM fs_game WHERE user_id = ?', [id]);
  const points = await pool.query('SELECT fs_game_point FROM fs_user WHERE id = ?', [id]);
  let p = points[0].fs_game_point;
  if(p > 0){
    switch (camp) {
      case 'fs_heal':
        let h = stasts[0].fs_heal;
        h++;
        p--;
        await pool.query(`UPDATE fs_game SET fs_heal = ? WHERE user_id = ?`, [h, id]);
        await pool.query(`UPDATE fs_user SET fs_game_point = ? WHERE id = ?`, [p, req.user.id]);
        return res.json({p,l:h});
        break;

      case 'fs_at':
        let at = stasts[0].fs_at;
        at++;
        p--;
        await pool.query(`UPDATE fs_game SET fs_at = ? WHERE user_id = ?`, [at, id]);
        await pool.query(`UPDATE fs_user SET fs_game_point = ? WHERE id = ?`, [p, req.user.id]);
        return res.json({p,l:at});
        break;

      case 'fs_def':
        let def = stasts[0].fs_def;
        def++;
        p--;
        await pool.query(`UPDATE fs_game SET fs_def = ? WHERE user_id = ?`, [def, id]);
        await pool.query(`UPDATE fs_user SET fs_game_point = ? WHERE id = ?`, [p, req.user.id]);
        return res.json({p,l:def});
        break;

      case 'fs_vel':
        let vel = stasts[0].fs_vel;
        vel++;
        p--;
        await pool.query(`UPDATE fs_game SET fs_vel = ? WHERE user_id = ?`, [vel, id]);
        await pool.query(`UPDATE fs_user SET fs_game_point = ? WHERE id = ?`, [p, req.user.id]);
        return res.json({p,l:vel});
        break;

      case 'fs_mana':
        let mn = stasts[0].fs_mana;
        mn++;
        p--;
        await pool.query(`UPDATE fs_game SET fs_mana = ? WHERE user_id = ?`, [mn, id]);
        await pool.query(`UPDATE fs_user SET fs_game_point = ? WHERE id = ?`, [p, req.user.id]);
        return res.json({p,l:mn});
        break;
    }
  }
});

module.exports = router;
