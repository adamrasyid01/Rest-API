const userRoute = require('express').Router();
const { getUsers, addUser, findById, deleteUser, updateUser } = require('../controllers/UserController');


userRoute.get('/', getUsers);
userRoute.post('/add', addUser);
userRoute.get('/find/:id', findById);
userRoute.delete('/delete/:id', deleteUser);
userRoute.put('/update/:id', updateUser);

module.exports = userRoute;
