module.exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  };