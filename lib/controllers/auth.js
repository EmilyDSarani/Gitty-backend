const { Router } = require('express');
const { codeForTolken, getGithubProfile } = require('../utils/github');
const { sign } = require('../utils/jwt');
const GithubUser = require('../models/GithubUser');
const authen = require('../middleware/authen');
//Remember that the Max-Age for cookies is in milliseconds, so you have to math it -- 1000 * 60 * 60 *24 = 1 day
const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = Router()
//Get Route for Github Sign In
//path- /api/v1/github/login
  .get('/login', (req, res) => {
    res.redirect(
      //we find this link in the docs Dan provides, then we have our secret id and secret uri that we got from github
      //then we have to put the scope as user because the scope will default to empty for the users who are not authorized
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&redirect_uri=${process.env.GH_REDIRECT_URI}&scope=user`
    );
  })

//Get Route for Logging in User
// path - /api/v1/github/login/callback
  .get('/login/callback', async (req, res, next) => {
    try{
      //get the code from the query
      const code = req.query.code;
      //pop code into the exchange token to get the access_token
      const gitTolken  = await codeForTolken(code);
      //pop access token into the getGithubProfile and destructure what we need from it
      const { login, avatar_url, email } = await getGithubProfile(gitTolken);
      //set user and do the if statement for if a user is logged in or not logged in
      let user = await GithubUser.findUsername(login, avatar_url, email);
      if (!user){
        user = await GithubUser.insert({ username: login, avatar: avatar_url, email });
      }
      //also, the sign is coming from the JWT in the utils file
      res
        .cookie(process.env.COOKIE_NAME, sign(user), {
          httpOnly: true,
          maxAge: ONE_DAY,
        })
        //we have to look at where we are sending them, so looking at the test, we know we want to redirect them to a page that has the information that the test is looking for. 
        //for this specifically, that is our dashboard-- vs just the empty ('/') which we only have HTML there, but not the email, avatar, username.
        .redirect('/api/v1/github/dashboard');
    } catch (error){
      next(error);
    }
  })
  .get('/dashboard', authen, async (req, res) => {
    // require req.user
    // get data about user and send it as json
    res.json(req.user);
  });

//Delete Route for deleting cookie sessions
// /api/v1/github
