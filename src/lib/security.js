module.exports = {

  SessionOn(req, res, next) {
    if(req.isAuthenticated()) {return next();}
    return res.redirect('/login');
  },

  SessionOff(req, res, next) {
    if(!req.isAuthenticated()) {return next();}
    return res.redirect('/dashboard');
  }

}
