const express = require("express");
const router = express.Router();

// IMPORT CONTROLLERS
const { 
    signup, 
    accountActivation,
    signin,
    forgotPasswordCtrl,
    resetPasswordCtrl,
    googleLogin,
    facebookLogin
  } = require("../controllers/auth");

// IMPORT VALIDATORS
const { 
  userSignupValidator, 
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator
 } = require("../validators/auth");

const { runValidation } = require("../validators");



router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signin', userSigninValidator, runValidation, signin);

// FORGET PASSWORD AND RESET PASSWORD routes
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPasswordCtrl);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPasswordCtrl);

// GOOGLE AND FACEBOOK LOGIN routes
router.post('/google-login', googleLogin);
router.post('/facebook-login', facebookLogin);




module.exports = router;
