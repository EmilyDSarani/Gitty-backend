/* eslint-disable no-console */
//we dont want to actually hit our github stuff, that can mess up the testing...right?
const CodeForToken = async (code) => {
  console.log(`MOCK INVOKED: exchangeCodeForToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};
  
const getGithubProfile = async (token) => {
  console.log(`MOCK INVOKED: getGithubProfile(${token})`);
  return {
    login: 'fake_github_user',
    avatar_url: 'https://www.placecage.com/gif/300/300',
    email: 'not-real@example.com',
  };
};
  
module.exports = { CodeForToken, getGithubProfile };
