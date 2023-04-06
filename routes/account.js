var express = require('express');
var router = express.Router();
var LoginModel = require("../controllers/account")

/* GET users listing. */
router.get('/',LoginModel.getAccount);
router.get('/:id',LoginModel.getAccount);
router.post('/', LoginModel.createAccount);
router.delete('/:id', LoginModel.deleteUser);
router.put('/:id', LoginModel.updateUser);


router.post('/signin', LoginModel.forLogin);
router.post('/signup', LoginModel.forSignup);

module.exports = router;
