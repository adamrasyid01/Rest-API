const postRoute = require('express').Router();
const { getPosts, addPost, findPostById, deletePost, updatePost } = require('../controllers/PostController');

postRoute.get('/', getPosts);
postRoute.post('/add', addPost);
postRoute.get('/find/:id', findPostById);
postRoute.delete('/delete/:id', deletePost);
postRoute.put('/update/:id', updatePost);

module.exports = postRoute;
