import { NextFunction, Request, Response } from "express";
import { auth } from "firebase-admin";
import mongoose from "mongoose";
const express = require("express");
const uuid = require("uuid");

const taskSchema = new mongoose.Schema({
	uuid: String,
	name: String,
	description: String,
	user: String,
	created: Date,
	updated: Date,
	status: Number
});

const Task = mongoose.model("Task", taskSchema);

const tasksRouter = express.Router();

// middleware that is specific to this tasksRouter
tasksRouter.use((req: any, res: Response, next: NextFunction) => {
	const auth = req.currentUser;
	if (auth) {
		next();
	} else {
		return res.status(403).send("Unauthorized");
	}
});

// get all user's tasks
tasksRouter.get("/", async (req: any, res: Response) => {
	Task.find({ user: req.currentUser.user_id }).then((result) => {
		res.send(result);
	});
});

// get one of user's tasks
tasksRouter.get("/:taskId", (req: Request, res: Response) => {});

// create a user's task
tasksRouter.post("/", (req: any, res: Response) => {
	const aTask = new Task({
		uuid: uuid.v4(),
		name: req.body.name,
		description: req.body.description,
		user: req.currentUser.user_id,
		created: new Date(),
		updated: new Date(),
		status: 0
	});

	aTask.save().then(() => {
		res.send({ task: aTask });
	});
});

// update a user's task
tasksRouter.put("/:taskId", (req: Request, res: Response) => {});

// delete a user's task
tasksRouter.delete("/:taskId", (req: Request, res: Response) => {
	Task.deleteOne({ uuid: req.params.taskId }).then(
		() => res.send(true),
		(err) => res.send(false)
	);
});

module.exports = tasksRouter;
