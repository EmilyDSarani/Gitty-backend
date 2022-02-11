const fetch = require('cross-fetch');

const codeForToken = async (code) => {
  //we need to fetch the github auth, which is found in the docs
  const tokenRequest = await fetch('https://github.com/login/oauth/access_token', {
    //we want our method to post and our headers to accept json
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    //we would want the body to comes back stringy
    body: JSON.stringify({
      client_id: process.env.GH_CLIENT_ID,
      client_secret: process.env.GH_CLIENT_SECRET,
      code, 
    })
  });
  //deconstruc access token off of our awaited tokenReq fetch above
  const { access_token } = await tokenRequest.json();
  return access_token; 
};

const getGithubProfile = async (token) => {
  //url provided from docs
  const profileReq = await fetch('https://api.github.com/user', {
    headers:{
      //we want to accept an application in json format and authorize the token that we expect
      Accept: 'application/json',
      Authorization: `token ${token}`,
    }
  });
  //jsonify it and return
  const profile = await profileReq.json();
  return profile;
};

module.exports = { codeForToken, getGithubProfile };
