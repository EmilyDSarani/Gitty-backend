const jwt = require('jsonwebtoken');

module.exports = async(req, res, next) => {
  try { 
    //cookie magic
    const cookie = req.cookies[process.env.COOKIE_NAME];

    //no cookie throw error
    if (!cookie) throw new Error('You must walk long enough to create 3 movies...or sign in');
    //verify jwt
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;
    //throw a try-catch around it all
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }



};
