import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { MdOutlineVisibility, MdModeEdit, MdDelete } from "react-icons/md";
import { FocusState, useFocus } from "../Pages/Dashboard";
import "./Note.scss";

export interface NoteProps {
	id: string;
	name: string;
	content: string;
	createdDate: Date;
	updatedDate: Date;
	onDelete: Function;
}

function Note({ id, name, content, createdDate, updatedDate, onDelete }: NoteProps) {
	const { setData, setFocusModal } = useFocus();

	function onView() {
		setFocusModal(FocusState.VIEW_NOTE);
		setData({ id, name, content, createdDate, updatedDate });
	}
	function onEdit() {
		setFocusModal(FocusState.EDIT_NOTE);
		setData({ id, name, content, createdDate, updatedDate });
	}

	return (
		<div className="note" id={id}>
			<h1>{name ? name : `Updated: ${updatedDate}`}</h1>
			<div className="button-container">
				<button onClick={() => onView()}>
					<MdOutlineVisibility />
				</button>
				<button onClick={() => onEdit()}>
					<MdModeEdit />
				</button>
				<button onClick={() => onDelete(id)}>
					<MdDelete />
				</button>
			</div>
		</div>
	);
}

export default Note;
