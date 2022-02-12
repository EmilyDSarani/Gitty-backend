//import le pool
const pool = require('../utils/pool');

module.exports = class PostMessage {
  postId;
  message;
  userId;
  createdAt;

  //constructor
  constructor(row){
    this.postId = row.post_id;
    this.message = row.message;
    this.createdAt = row.created_at;
    this.userId = row.user_id;
  }
  //instert post 
  static async insert({ message, userId }){
    const { rows } = await pool.query(
      `
              INSERT INTO posts (message, user_id)
              VALUES ($1, $2)
              RETURNING *
              `,
      [message, userId]
    );
    return new PostMessage(rows[0]);
  }
  //get all posts


};
