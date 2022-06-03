import { NextFunction, Request, Response } from "express";
const express = require("express");

const usersRouter = express.Router();

// middleware that is specific to this usersRouter
usersRouter.use((req: Request, res: Response, next: NextFunction) => {
	next();
});
// define the home page route
usersRouter.get("/login", (req: any, res: Response) => {
	const auth = req.currentUser;
	if (auth) {
		return res.send(true);
	}
	return res.status(401).send("User not authenticated");
});

// define the about route
usersRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.send("Users and stuff");
});

module.exports = usersRouter;
