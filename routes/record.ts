import { NextFunction, Request, Response } from "express";
const express = require("express");

const router = express.Router();

// middleware that is specific to this router
router.use((req: Request, res: Response, next: NextFunction) => {
	console.log("Time: ", Date.now());
	next();
});
// define the home page route
router.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.send("Records and stuff");
});
// define the about route
router.get("/about", (req: Request, res: Response, next: NextFunction) => {
	res.send("About records");
});

module.exports = router;
