module.exports = function(req,res,next){
    res.locals.isAuth = req.session.isAuthenticated
    if(req.session.user)
        res.locals.user = req.session.user.user_name
    if(!req.session.isAuthenticated)
        //res.redirect('/users')
    console.log(req.session)
    next()
}