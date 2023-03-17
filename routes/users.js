var express = require('express');
var router = express.Router();

const user_pass = {
  user:"geo",
  password:"123"
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

router.post('/login',function(req,res){

   // login logic to validate req.body.user and req.body.pass
  // would be implemented here. for this example any combo works

  // regenerate the session, which is good practice to help
  // guard against forms of session fixation
  if(req.body.user.toLowerCase() == user_pass.user&&req.body.password == user_pass.password){
    req.session.regenerate(function (err) {
      if (err) next(err)

      // store user information in session, typically a user id
      req.session.user = req.body.user
      req.session.isAuthenticated = true

      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err)
        res.redirect('/')
      })
    })
  }else{
    res.redirect('/users')
  }
})

router.get('/logout', function (req, res, next) {
  // logout logic

  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null
  req.session.save(function (err) {
    if (err) next(err)

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/')
    })
  })
})
module.exports = router;
