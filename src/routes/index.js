const route = require('express').Router();


route.get('/', (req, res) => {
    res.send('Page Utama')
});

const userRoutes = require('./user.js')
route.use('/users', userRoutes);

const profileRoutes = require('./profile.js');
route.use('/profiles', profileRoutes);

const postRoutes = require('./post.js');
route.use('/posts', postRoutes);

module.exports = route;
