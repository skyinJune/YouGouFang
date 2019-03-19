var express = require('express');
var router = express.Router();
var api = require('../mongo/api');

/* GET home page. */
router.get('/show', function(req, res, next) {
  api.find({}).then(result => {res.json(result)});
});

router.post('/save', function(req, res, next) {
  var testSave = req.body;
  api.save(testSave).then(result =>{
    res.json(result);
  })
})

module.exports = router;
