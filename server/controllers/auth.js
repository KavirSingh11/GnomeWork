const { User, validateEmail } = require("../models/user");
const jwt = require("jwt-simple");
const keys = require("../config/keys");

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user._id, iat: timestamp }, keys.tokenKey);
}

const signup = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const name = req.body.name;
	const type = req.body.type;
	let user = await User.findOne({ email });
	try {
		if (!validateEmail(email)) {
			res.status(400).send("Please enter a valid email");
		}
		if (user) {
			res.status(422).send("User with that email exists");
		} else {
			user = new User({
				email: email,
				password: password,
				name: name,
				type: type,
			});
			await user.save();
			res.status(200).json({
				token: tokenForUser(user),
				userID: user._id,
				msg: "signed up",
			});
		}
	} catch (e) {
		res.status(500).send(`Error: ${e.message}`);
	}
};

const signin = (req, res, next) => {
	res.status(200).send({
		token: tokenForUser(req.user),
		id: req.user._id,
		msg: "signed in",
	});
};

module.exports = {
	signin,
	signup,
};
