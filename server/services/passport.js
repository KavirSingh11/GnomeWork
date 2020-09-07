const passport = require("passport");
const { User } = require("../models/user");
const config = require("../config/keys");
const JwtStrat = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrat = require("passport-local");

const localOptions = { usernameField: "email" };
const localLogin = new LocalStrat(localOptions, (email, password, done) => {
	User.findOne({ email: email }, (err, user) => {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false);
		}
		user.comparePass(password, function (err, isMatch) {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				return done(null, false);
			}
			return done(null, user);
		});
	});
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader("auth-token"),
	secretOrKey: config.tokenKey,
};
const jwtLogin = new JwtStrat(jwtOptions, (payload, done) => {
	User.findById(payload.sub, (err, user) => {
		if (err) {
			return done(err, false);
		}
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);
