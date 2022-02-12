/* eslint-disable no-console */
//we dont want to actually hit our github stuff, that can mess up the testing...right?
const codeForTolken = async (code) => {
  console.log(`MOCK INVOKED: codeForTolken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};
  
const getGithubProfile = async (token) => {
  console.log(`MOCK INVOKED: getGithubProfile(${token})`);
  return {
    login: 'Sauron_Number_One',
    avatar_url: 'https://icon2.cleanpng.com/20180421/kae/kisspng-sauron-deviantart-dark-lord-fan-art-throne-5adbeadb5ca142.4864622915243619473794.jpg',
    email: 'eye.sauron@mordor.com',
  };
};
  
module.exports = { codeForTolken, getGithubProfile };
