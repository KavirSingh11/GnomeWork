const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	type: {
		type: Number,
	},
});

UserSchema.pre("save", function (next) {
	const user = this;
	bcrypt.genSalt(10, function (err, salt) {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, function (err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePass = function (candidate, callback) {
	bcrypt.compare(candidate, this.password, function (err, isMatch) {
		if (err) {
			return callback(err);
		}
		callback(null, isMatch);
	});
};

function validateEmail(email) {
	const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return emailRegEx.test(email);
}

const User = mongoose.model("user", UserSchema);

exports.User = User;
exports.validateEmail = validateEmail;
