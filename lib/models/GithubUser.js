// import the pool 
const pool = require('../utils/pool');

module.exports = class GithubUser {
  // userId, username, email, avatar
  id;
  username;
  email;
  avatar;
 
  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
    this.avatar = row.avatar;
  }

  //insert a user so that they can log into github later
  static async insert({ username, email, avatar }) {
    if (!username) throw new Error('Username is required');

    const { rows } = await pool.query(
      `
      INSERT INTO auths (username, email, avatar)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [username, email, avatar]
    );

    return new GithubUser(rows[0]);
  }

  //findUsername because it is unique
  //so we can find the user by their username and it wont be an issue
  static async findUsername(username) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM auths
      WHERE username=$1
      `,
      [username]
    );

    if (!rows[0]) return null;

    return new GithubUser(rows[0]);
  }


};
