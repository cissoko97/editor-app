var express = require('express');
var router = express.Router();
const associationController = require("./../controller/AssocierController");

/* GET Chat page. */
router.get('/', function(req, res) {
    res.render('chat.ejs'); //changer le nom chat.ejs pour le nom di fichier .ejs auquel il est associé
});

router.post('/save', associationController.invitation);

module.exports = router;