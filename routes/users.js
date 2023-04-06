var express = require('express');
var router = express.Router();
var getAccount = require('../controllers/account')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', getAccount.getAccount);
router.get('/:id', getAccount.getAccount);

module.exports = router;
