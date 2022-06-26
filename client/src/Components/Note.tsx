import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";

export enum NoteState {
	"preview",
	"view",
	"edit"
}

export interface NoteProps {
	id: string;
	name: string;
	contents: string;
	createdDate: Date;
	updatedDate: Date;
	state: NoteState;
	onDelete: Function;
	onView: Function;
	onEdit: Function;
}

function Note({ id, name, contents, createdDate, updatedDate, state, onDelete, onView, onEdit }: NoteProps) {
	return (
		<div className="note">
			<h1>{name}</h1>
			<div>{contents}</div>
		</div>
	);
}

export default Note;
