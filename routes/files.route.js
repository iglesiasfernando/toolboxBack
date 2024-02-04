var express = require('express');
var router = express.Router();
var filesController = require('../controllers/files.controller');

router.get('/data', filesController.get);
module.exports = router;