const express = require("express");
const router = express.Router();
const passportService = require("./services/passport");
const passport = require("passport");

const auth = require("./controllers/auth");
const project = require("./controllers/project");
const team = require("./controllers/team");
const task = require("./controllers/task");

const requireAuth = passport.authenticate("jwt", { session: false });
const verifySignIn = passport.authenticate("local", { session: false });

router.post("/signup", auth.signup);
router.post("/signin", verifySignIn, auth.signin);
router.get("/getUser", requireAuth, auth.getUser);

router.post("/project", requireAuth, project.postProject);
router.get("/project/:type/:userID", requireAuth, project.getProjects);
router.patch("/project/:type/:projectID", requireAuth, project.editProject);
router.delete("/project/:type/:projectID", requireAuth, project.deleteProject);

router.post("/team", requireAuth, team.postTeam);
router.get("/team/:type/:userID", requireAuth, team.getTeams);
router.patch("/team/:type/:ownerID/", requireAuth, team.editTeam);
router.delete("/team/:type/:ownerID/:teamName", requireAuth, team.deleteTeam);

router.post("/task", requireAuth, task.postTask);
router.get("/task/:projectID", requireAuth, task.getTasks);
router.patch("/task/:projectID", requireAuth, task.editTask);
router.delete("/task/:projectID/:taskName", requireAuth, task.deleteTask);
router.delete("/task/:projectID", requireAuth, task.projectDeleted);

router.get("/verify/:user", project.verifyUser);
router.get("/test/:kenobi", requireAuth, (req, res, next) => {
	res.send({ helloThere: `general ${req.params.kenobi}` });
});

module.exports = router;
