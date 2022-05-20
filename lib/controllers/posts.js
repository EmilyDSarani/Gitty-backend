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
  })
//Get Route for getting all the posts
// /api/v1/posts
  .get('/', async (req, res, next) => {
    try{
      const posty = await PostMessage.getAll();
      res.send(posty);
    } catch (error){
      next(error);
    }
  })
  .delete('/', (req, res, next) => {
    try{
      res
        .clearCookie(process.env.COOKIE_NAME)
        .json({  
          success:true, 
          message: 'Signed Out--You Passed!' });
    } catch (error){
      next(error);
    }
  });

