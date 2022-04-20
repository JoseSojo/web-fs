const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../../database.js');
const helpers = require('./helpers.js');

const GenerateGamer = async (id) => {
  const NewDataGame = {
    fs_heal: 5,
    fs_lv: 1,
    fs_at: 2,
    fs_def: 2,
    fs_vel: 2,
    fs_mana: 2,
    fs_exp: 0,
    user_id: id
  }
  await pool.query('INSERT INTO fs_game SET ?', [NewDataGame]);
}


passport.use('local.login', new LocalStrategy({
  usernameField: 'fs_username',
  passwordField: 'fs_password',
  passReqToCallback: true
}, async (req, fs_username, fs_password, done) =>{
  const names = await pool.query('SELECT * FROM fs_user WHERE fs_username = ?', [fs_username]);
  if(names.length > 0){
    const user = names[0];
    console.log('contraseña: ' + fs_password);
    console.log('Usuario: ' + fs_username);
    const vp = await helpers.matchPassword(fs_password, user.fs_password);
    if(vp){
      done(null, user, req.flash('success', 'Welcome Fantasy Story ' + user.fs_username));
    } else{
      done(null, false, req.flash('danger', 'Password Invalid'));
    }
  } else{
    console.log('El usuario ' + fs_username + ' no existe');
    done(null, false, req.flash('danger', 'The user ' + fs_username + ' not exits'));
  }
}));

passport.use('local.register', new LocalStrategy({
  usernameField: 'fs_username',
  passwordField: 'fs_password',
  passReqToCallback: true
}, async(req, fs_username, fs_password, done) => {
  const rows = await pool.query('SELECT * FROM fs_user WHERE fs_username = ?', fs_username);
  if(rows.length > 0) {
    done(null, false, req.flash('danger', 'The username ya existe'));
  } else{
    const {fs_fullname, fs_age, fs_email} = req.body;
    const NewUser = {
      fs_username,
      fs_fullname,
      fs_password,
      fs_email,
      fs_age,
      fs_game_point: 6,
      fs_role: 'Player'
    }
    NewUser.fs_password = await helpers.encryptPassword(NewUser.fs_password);
    const r = await pool.query('INSERT INTO fs_user SET ?', [NewUser]);
    GenerateGamer(r.insertId);
    NewUser.id = r.insertId;
    return done(null, NewUser, req.flash('success', 'Welcome Fantasy Story ' + NewUser.fs_username));
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM fs_user WHERE id = ?', [id]);
  done(null, rows[0]);
});
