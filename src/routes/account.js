var express = require('express');
var router = express.Router();

const accountController = require("./../controller/AccountController");

/* GET login page. */
router.get('/', function(req, res) {
    res.render('login.ejs');
});

/*router.get('/registration', function(req, res) {
    res.render('register.ejs');
});*/

router.get('/logout', accountController.logout);

router.post('/', accountController.login);

router.post('/registration', accountController.create);

module.exports = router;