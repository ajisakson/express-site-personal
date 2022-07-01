import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const express = require("express");
const uuid = require("uuid");

const noteSchema = new mongoose.Schema({
	uuid: String,
	name: String,
	content: String,
	user: String,
	created: Date,
	updated: Date
});

const Note = mongoose.model("Note", noteSchema);

const notesRouter = express.Router();

// middleware that is specific to this notesRouter
notesRouter.use((req: any, res: Response, next: NextFunction) => {
	const auth = req.currentUser;
	if (auth) {
		next();
	} else {
		return res.status(403).send("Unauthorized");
	}
});

// get all user's tasks
notesRouter.get("/", async (req: any, res: Response) => {
	Note.find({ user: req.currentUser.user_id }).then((result) => {
		res.send(result);
	});
});

// get one of user's tasks
notesRouter.get("/:noteId", (req: Request, res: Response) => {});

// create a user's task
notesRouter.post("/", (req: any, res: Response) => {
	const aNote = new Note({
		uuid: uuid.v4(),
		name: req.body.name,
		content: req.body.content,
		user: req.currentUser.user_id,
		created: new Date(),
		updated: new Date()
	});

	aNote.save().then(() => {
		res.send({ note: aNote });
	});
});

// update a user's task
notesRouter.put("/", (req: Request, res: Response) => {
	Note.updateOne(
		{ uuid: req.body.id },
		{
			$set: {
				name: req.body.name,
				content: req.body.content,
				updated: new Date()
			}
		}
	).then((result) => {
		res.send({
			result,
			note: { uuid: req.body.id, name: req.body.name, content: req.body.content, updated: new Date() }
		});
	});
});

// delete a user's task
notesRouter.delete("/:noteId", (req: Request, res: Response) => {
	Note.deleteOne({ uuid: req.params.noteId }).then(
		() => res.send(true),
		(err) => res.send(false)
	);
});

module.exports = notesRouter;
