const express = require('express');
const {activateAccount, deleteAccount, forgetPassword, resetPassword, updatePassword, signup, login, changeRole} = require("../controllers/user.controller");
const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.patch('/activateAccount/', activateAccount);
router.delete('/deleteAccount', deleteAccount);
router.patch('/updatePassword', updatePassword);
router.patch('/forgetPassword', forgetPassword);
router.patch('/resetPassword', resetPassword);
router.patch('/changeRole', changeRole);

module.exports = router;
