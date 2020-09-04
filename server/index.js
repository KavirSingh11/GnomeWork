const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const keys = require("./config/keys");
const routes = require("./router");

const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect(
	process.env.MONGODB_URI || keys.MongoURI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("Database connected...");
	}
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
	console.log(`Server up on port ${PORT}...`);
});
