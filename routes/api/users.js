//* Routing Logic

const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


//* POST 

//dot notation is used here to access create function because it is exported in curly brackets
// pass it to the usersCtrl create function
//! ?Abraham said something about usersCtrl and what it was...try to remember/ask/rewatch
router.post('/', usersCtrl.create);

router.post('/login', usersCtrl.login);

//using the ensured logged in, we protect the route (i.e. limit/require conditions -- such as login -- for engagement)
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);



module.exports = router;