var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	config = require('../config'),
	auth = config.authenticate;

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

passport.use(new LocalStrategy(
	function (username, password, done) {
		if (auth.username === username && auth.password === password) {
			return done(null, { username: username });
		}

		return done(null, false, { message: 'Bad Credentials' });
	}
));

/**
 * Authenticate middleware check.
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
exports.authenticate = function (req, res, next) {
	if (!auth) {
		return next();
	}
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};