// app/routes.js
module.exports = function(app, passport, router) {

	var User  = require('./models/user');
	var Saved = require('./models/save');
	var Follows = require('./models/follow');
    var Views = require('./models/pageViews')

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
        res.redirect(req.query.hash);
    });
    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : 'back',
            failureRedirect : '/login'
        }));

    // =====================================
    // API ROUTES =====================
    // =====================================
    // All routes to be used for the API

    router.route('/user')
    .get(function(req, res, next) {
        if (req.isAuthenticated()) {
            User.findById(req.user._id, function(err, user) {
              if (err) throw err;
              res.json(user)
            });
        } else {
            res.send(404)
        }
    });

    router.route('/saved')
    .get(function(req, res, next) {
        if (req.isAuthenticated()) {
            Saved.find({ user: req.user._id }).exec(function(err, saves) {
              if (err) throw err;
              res.json(saves)
            });
        } else {
            res.send(404)
        }
    })
    .post(function(req, res, next) {
        if (req.isAuthenticated()) {
            var Save = new Saved();
            Save.saved = req.body;
            Save.user = req.user._id;
            Save.save(function(err) {
                if (err) 
                   res.send(err);

                res.json({ message: 'follow saved!' });
            });
        } else {
            res.send(404)
        }
    });
    router.route('/following')
    .get(function(req, res, next) {
        if (req.isAuthenticated()) {
            Follows.find({ user: req.user._id }).exec(function(err, follows) {
              if (err) throw err;
              res.json(follows)
            });
        } else {
            res.send(404)
        }
    })
    .post(function(req, res, next) {
        if (req.isAuthenticated()) {
            var follow = new Follows();
            follow.following = req.body;
            follow.user = req.user._id;
            follow.save(function(err) {
                if (err) 
                   res.send(err);

                res.json({ message: 'follow saved!' });
            });
        }
        else {
            res.send(404)
        }
    });

    router.route('/pageview/delete/:id')
    .get(function(req, res, next) {

        Views.remove({_id: req.params.id}, function(err, url) {
            if (err) throw err;
            
            res.send({ message: url + ' Deleted' });
        });
        
    });
    router.route('/pageview/:url')
    .get(function(req, res, next) {

        Views.find({url: req.params.url}, function(err, urlViews) {
            if (err) throw err;
            
            res.send(urlViews);
        });
        
    })
    .post(function(req, res, next) {
        if (req.body.id) {

            Views.findByIdAndUpdate(req.body.id, { 
                viewCount: req.body.viewCount
            }, 
            function(err, post) {
                if (err) throw err;
                
                res.send('Success');
            });
        }
        
        else {
           
           Views.find({url: req.params.url}, function(err, response) {
            if(!response[0]) {
                console.log("error");
                console.log(response[0]);
                var newUrl = Views({
                   url: req.body.url,
                   viewCount: 1,
                });
                newUrl.save(function(err) {
                   if (err) throw err;
                   res.send('Success');
                });
            } else {
                console.log("no error, it exists");
                Views.findByIdAndUpdate(req.body.id, { 
                    viewCount: req.body.viewCount
                }, 
                function(err, post) {
                    if (err) throw err;
                    
                    res.send('Success');
                });
            }
           });
            
        }
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