const { Router } = require('express');
const authen = require('../middleware/authen');
const PostMessage = require('../models/PostMessage');

module.exports = Router()
//Post Route for creating a new post for the signed in user
// /api/v1/posts
  .post('/', authen, async (req, res, next) => {
    try{
      const userId = req.user.userId;
      const posts = await PostMessage.insert({ 
        ...req.body }, userId);
      res.json(posts);
    } catch (error){
      next(error);
    }
  });
//Get Route for getting all the posts
// /api/v1/posts

