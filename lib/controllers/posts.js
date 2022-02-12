const { Router } = require('express');
const aunthen = require('../middleware/aunthen');
const PostMessage = require('../models/PostMessage');

module.export = Router()
//Post Route for creating a new post for the signed in user
// /api/v1/posts
  .post('/posts', aunthen, async (req, res, next) => {
    try{
      const posts = await PostMessage.createMessage({ 
        message: req.body.message, userId: req.user.id, username: req.user.username });
      res.json(posts);
    } catch (error){
      next(error);
    }
  });
//Get Route for getting all the posts
// /api/v1/posts
