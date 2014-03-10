exports.login = function login(req,res) {
  res.render('users/login');
};

// post login info
  // app.post('/login',
  // passport.authenticate('local', { successRedirect: '/',
  //                                  failureRedirect: '/login' }));
