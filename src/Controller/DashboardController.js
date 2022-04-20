/*
  * CONTROLLER REGISTER
  * @router('/register') name='Register'
  * @session true
*/

const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const pool = require('../../database.js');
const helpers = require('../lib/helpers.js');
const {SessionOn} = require('../lib/security.js');

/*
 * PETICION GET
*/
router.get('/dashboard', SessionOn, async (req, res) => {
  const posts = await pool.query('SELECT * FROM fs_post');
  for (let i = 0; i < posts.length; i++) {
    posts[i].id_session = req.user.id;
  }
  posts.reverse();
  res.render('ViewSession/Dashboard.hbs', {
    name: 'Dashboard',
    posts: posts
  });
});

router.post('/post/new', SessionOn, async(req, res) =>{
  const levels = await pool.query('SELECT * FROM fs_game WHERE user_id = ?', [req.user.id]);
  const {fs_post_description} = req.body;
  if(fs_post_description){
    const NewPost = {
      fs_post_user_id: req.user.id,
      fs_post_author: req.user.fs_username,
      fs_post_level: levels[0].fs_lv,
      fs_post_description,
      fs_post_likes: 0,
      fs_post_dislikes: 0,
      fs_post_healt: 0
    };
    await pool.query('INSERT INTO fs_post SET ?', NewPost);
    req.flash('success', 'Post created successting')
    res.redirect('/dashboard');
  } else{
    req.flash('danger', 'Ingrese una description');
    res.redirect('/dashboard');
  }
})

router.post('/post/reaction/:id', SessionOn, async(req, res) => {
  const {id, camp} = req.body;
  switch (camp) {
    case 'fs_post_likes':
      const likes = await pool.query('SELECT * FROM fs_post WHERE id = ?', [id]);
      let l = likes[0].fs_post_likes;
      l++;
      await pool.query('UPDATE fs_post SET fs_post_likes = ? WHERE id = ?', [l, id]);
      return res.json(l);
      break;

    case 'fs_post_healt':
      const healt = await pool.query('SELECT * FROM fs_post WHERE id = ?', [id]);
      let h = healt[0].fs_post_healt;
      h++;
      await pool.query('UPDATE fs_post SET fs_post_healt = ? WHERE id = ?', [h, id]);
      return res.json(h);
      break;

    case 'fs_post_dislike':
      const dislike = await pool.query('SELECT * FROM fs_post WHERE id = ?', [id]);
      let dl = dislike[0].fs_post_dislikes;
      dl++;
      await pool.query('UPDATE fs_post SET fs_post_dislikes = ? WHERE id = ?', [dl, id]);
      return res.json(dl);
      break;

    default:
      res.json(false);

  }
});


module.exports = router;
