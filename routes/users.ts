import { NextFunction, Request, Response } from "express";
const express = require("express");

const router = express.Router();

// middleware that is specific to this router
router.use((req: Request, res: Response, next: NextFunction) => {
	console.log("Time: ", Date.now());
	next();
});
// define the home page route
router.get("/login", (req: any, res: Response) => {
	const auth = req.currentUser;
	if (auth) {
		return res.send(true);
	}
	return res.status(401).send("User not authenticated");
});

// define the about route
router.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.send("Users and stuff");
});

module.exports = router;
