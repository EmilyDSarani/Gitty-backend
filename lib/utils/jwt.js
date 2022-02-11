//get the token to send it off
const jwt = require('jsonwebtoken'); 

//we want to get the secret to get the user signed in
const sign = (signed) => {
  return jwt.sign({ ...signed }, process.env.JWT_SECRET, {
    expiresIn: '1 day',
  });
};
//send it off
module.exports = {
  sign
};
