const profileRoute = require('express').Router();
const { getProfile, addProfile, findById, deleteProfile, updateProfile } = require('../controllers/ProfileController');


profileRoute.get('/', getProfile);
profileRoute.post('/add', addProfile);
profileRoute.get('/find/:id', findById);
profileRoute.delete('/delete/:id', deleteProfile);
profileRoute.put('/update/:id', updateProfile);

module.exports = profileRoute;
