const passport = require('passport');

exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt');
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzUyMTdmNTlkYTQ0Zjc5YTAxOWJjYyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA3NDE4MTA5fQ.zJ0siTMBnWEzSskDbv_pGvrhniHhULig-TVaFQde4Rk"
  return token;
};
