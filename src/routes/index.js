const express = require('express');
const { isLoggedIn } = require('../lib/auth');

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
});

module.exports = router;