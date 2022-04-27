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
router.get('/profile', SessionOn,async (req, res) => {
  const stast = await pool.query('SELECT * FROM fs_game WHERE user_id = ?', [req.user.id]);
  const gammer = stast[0];
  const dataUser = [
    {
      title: 'Username',
      value: req.user.fs_username
    },
    {
      title: 'Fullname',
      value: req.user.fs_fullname
    },
    {
      title: 'Email',
      value: req.user.fs_email
    },
    {
      title: 'Age',
      value: req.user.fs_age
    }
  ];
  const dataGammer = [
    {
      title: 'Healt',
      value: gammer.fs_heal,
      title2: 'Level',
      value2: gammer.fs_lv
    },
    {
      title: 'Type',
      value: gammer.fs_type,
      title2: 'Rank',
      value2: gammer.fs_rg
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
    dataUser: dataUser,
    dataGammer: dataGammer
  });
});

router.get('/profile/post', SessionOn, async (req, res) => {
  const posts = await pool.query('SELECT * FROM fs_post WHERE fs_post_user_id = ?', [req.user.id]);
  let notPost = false;
  if(posts.length < 1) notPost = true;
  res.render('ViewSession/Profile.hbs', {
    name: 'Profile',
    tab: 'Post',
    posts,
    notPost: notPost
  });
})

router.get('/profile/update', SessionOn, (req, res) => {
  data[0].value = req.user.fs_username;
  data[1].value = req.user.fs_fullname;
  data[2].value = req.user.fs_email;
  data[3].value = req.user.fs_age;
  res.render('ViewSession/Profile.hbs', {
    name: 'Profile',
    tab: 'Update Data',
    inputs: data,
    action: '/profile/update'
  });
});

router.get('/profile/password', SessionOn, (req, res) => {
  res.render('ViewSession/Profile.hbs', {
    name: 'Profile',
    tab: 'Update Password',
    inputs: password,
    action: '/profile/password'
  });
});

router.get('/profile/mission', SessionOn, async (req,res) =>{
  let missionStatus = true;
  const missions = await pool.query('SELECT * FROM fs_mission WHERE fs_user_accept = ?', [req.user.id]);
  if(missions.length > 0) missionStatus = false;
  res.render('ViewSession/Profile.hbs', {
    name: 'Profile',
    tab: 'Missions',
    missions,
    missionStatus,
    action: '/profile/mission'
  });
})

router.post('/post/delete/:id', SessionOn, async(req, res) =>{
  const {id} = req.params;
  await pool.query('DELETE FROM fs_post WHERE id = ?',[id]);
  console.log('Post Deleted');
  req.flash('success', 'Post delete successting');
  return res.redirect('/profile/post');
})

router.post('/post/up/:id', SessionOn, async(req, res) =>{
  const {id} = req.params;
  const rows = await pool.query('SELECT * FROM fs_post WHERE id = ?',[id]);
  console.log(rows);
  const PostUpdate = { fs_post_description: rows[0].fs_post_description, id };
  res.render('ViewSession/Dashboard.hbs', {
    name: 'Dashboard',
    PostUpdate: PostUpdate
  });
});

router.post('/post/update/:id', SessionOn, async(req, res) =>{
  const {id} = req.params;
  const {fs_post_description} = req.body;
  await pool.query('UPDATE fs_post SET fs_post_description = ? WHERE id = ?', [fs_post_description, id]);
  req.flash('success', 'Post update successting');
  res.redirect('/profile/post');
});

router.post('/profile/update', SessionOn, async (req, res, done) =>{
  const {fs_age, fs_username, fs_email, fs_fullname} = req.body;
  const UpdateUser = {fs_email,fs_age,fs_fullname,fs_username};
  await pool.query('UPDATE fs_user SET ? WHERE id = ?', [UpdateUser, req.user.id]);
  req.flash('success', 'Data update successting');
  res.redirect('/profile');
});

router.post('/profile/password', SessionOn, async (req, res, done) =>{
  const {fs_password, password_saved} = req.body;
  const UpdateUser = {fs_password};
  UpdateUser.fs_password = await helpers.encryptPassword(UpdateUser.fs_password);
  const password = await helpers.matchPassword(password_saved, req.user.fs_password);
  if(password){
    await pool.query('UPDATE fs_user SET ? WHERE id = ?', [UpdateUser, req.user.id]);
    req.flash('success', 'Password update successting');
    res.redirect('/profile');
  }
  return req.flash('danger', 'The password is invalid');
});

router.post('/profile/mission/delete/:id', SessionOn, async (req, res, done) =>{
  await pool.query(`UPDATE fs_mission SET fs_status=0, fs_user_accept= NULL WHERE id = ?`, [req.params.id]);
  req.flash('success', 'Password update successting');
  req.flash('danger', 'Mission Delete');
  res.redirect('/profile/mission');
});

module.exports = router;
