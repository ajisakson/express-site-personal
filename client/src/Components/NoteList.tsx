import axios from "axios";
import { useEffect, useState } from "react";
import { FocusState, useFocus } from "../Pages/Dashboard";
import createToken from "../Services/CreateToken";
import Note from "./Note";
import "./NoteList.scss";

export default function NoteList() {
	const [noteList, updateNoteList] = useState<any[]>([]);

	const { setData, setFocusModal } = useFocus();

	useEffect(() => {
		const fetchData = async () => {
			const header = await createToken();
			const res = await axios.get("/api/notes", header);
			updateNoteList(res.data);
		};
		fetchData();
	}, []);

	function addNote() {
		setFocusModal(FocusState.ADD_NOTE);
		setData({});
	}

	async function deleteNote(id: String) {
		const header = await createToken();
		const res = await axios.delete(`/api/notes/${id}`, header).then(() => {
			const newArray = noteList.filter((note) => note.uuid !== id);
			updateNoteList(newArray);
		});
	}

	return (
		<div className="note-list">
			<div className="note-list-header">
				Notes
				<button id="add-note-button" onClick={addNote}>
					+
				</button>
			</div>
			{noteList.map((note: any) => (
				<Note
					key={note.uuid}
					id={note.uuid}
					name={note.name}
					content={note.content}
					createdDate={note.created}
					updatedDate={note.updated}
					onDelete={deleteNote}
				/>
			))}
		</div>
	);
}
