const express = require("express");
const router = express.Router();
const auth = require("./controllers/auth");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

router.post("/signup", auth.signup);
router.post("/signin", requireSignin, auth.signin);

router.get("/test", (req, res, next) => {
	res.send({ helloThere: "general kenobi" });
});
router.get("/auth", requireAuth, (req, res, next) => {
	res.send({ youAre: "authorized" });
});
module.exports = router;
