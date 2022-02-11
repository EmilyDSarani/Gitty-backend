// import Router, Authen, JWT, GithubUser, CodeForToken, GetGitHubProfile
const { Router } = require('express');
//Remember that the Max-Age for cookies is in milliseconds, so you have to math it -- 1000 * 60 * 60 *24 = 1 day


module.exports = Router()
//Get Route for Github Sign In
//path- /api/v1/github/login
  .get('/login', (req, res) => {
    res.redirect(
      //we find this link in the docs Dan provides, then we have our secret id and secret uri that we got from github
      //then we have to put the scope as user because the scope will default to empty for the users who are not authorized
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&redirect_uri=${process.env.GH_REDIRECT_URI}&scope=user`
    );
  });

//Get Route for Logging in User
// path - /api/v1/github/login/callback


//Delete Route for deleting cookie sessions
// /api/v1/github
