const express = require('express');
const { createUser, loginUser, checkAuth, logoutUser } = require('../controller/Auth');
const passport = require('passport');

const router = express.Router();
//  /auth is already added in base path
router.post('/signup', createUser)
.post('/login', passport.authenticate('local'), loginUser)
.get('/check',passport.authenticate('jwt'), checkAuth)
.get('/logout', logoutUser);
exports.router = router;
