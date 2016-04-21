// app/routes.js
module.exports = function(app, passport, router) {

	var User  = require('./models/user');
	var Saves = require('./models/save');
	var Follows = require('./models/follow');

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
 
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/login'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // API ROUTES =====================
    // =====================================
    // All routes to be used for the API

    router.route('/saved')
    .get(function(req, res, next) {

        Saved.find({ user: req.params.user_id }).exec(function(err, saves) {
          if (err) throw err;
          res.json(saves)
        });
    })
    .post(function(req, res, next) {
        var save = new Saved();
        save.saved = req.body;
        save.user = req.user.facebook.id;
        console.log("req.body.name: " + req.body)
        console.log("req.body.user: " + req.user.facebook.id)
        follow.save(function(err) {
            if (err) 
               res.send(err);

            res.json({ message: 'follow saved!' });
        });
    });
    router.route('/following')
    .get(function(req, res, next) {
        Follows.find({ user: req.params.user_id }).exec(function(err, follows) {
          if (err) throw err;
          res.json(follows)
        });
    })
    .post(function(req, res, next) {
        var follow = new Follows();
        follow.following = req.body;
        follow.user = req.user.facebook.id;
        console.log("req.body.name: " + req.body)
        console.log("req.body.user: " + req.user.facebook.id)
        follow.save(function(err) {
            if (err) 
               res.send(err);

            res.json({ message: 'follow saved!' });
        });
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}