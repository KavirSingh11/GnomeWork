const express = require("express");
const router = express.Router();
const passportService = require("./services/passport");
const passport = require("passport");

const auth = require("./controllers/auth");
const project = require("./controllers/project");
const team = require("./controllers/team");
const task = require("./controllers/task");
const { getTasks } = require("./controllers/task");

const requireAuth = passport.authenticate("jwt", { session: false });
const verifySignIn = passport.authenticate("local", { session: false });

router.post("/signup", auth.signup);
router.post("/signin", verifySignIn, auth.signin);

router.post("/project", requireAuth, project.postProject);
router.get("/project/:type/:userID", requireAuth, project.getProjects);

router.post("/team", requireAuth, team.postTeam);
router.get("/team/:type/:userID", requireAuth, team.getTeams);

router.post("/task", requireAuth, task.postTask);
router.get("/task/:projectID", requireAuth, task.getTasks);

router.get("/verify/:user", requireAuth, project.verifyUser);
router.get("/test/:test", requireAuth, (req, res, next) => {
	res.send({ helloThere: `general ${req.params.test}` });
});

module.exports = router;
