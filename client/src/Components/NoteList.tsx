import axios from "axios";
import { useEffect, useState } from "react";
import createToken from "../Services/CreateToken";
import Note, { NoteState } from "./Note";
import "./NoteList.scss";

function NoteList() {
	const [noteList, updateNoteList] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const header = await createToken();
			const res = await axios.get("/api/notes", header);
			updateNoteList(res.data);
		};
		fetchData();
	}, []);

	function deleteNote() {}
	function viewNote() {}
	function onEditNote() {}

	return (
		<div className="note-list">
			<button
				onClick={() => {
					// add note to the side thingy idk
				}}
			>
				Create Note
			</button>
			{noteList.map((note: any) => {
				<Note
					key={note.uuid}
					id={note.uuid}
					name={note.name}
					contents={note.contents}
					createdDate={note.created}
					updatedDate={note.updated}
					state={NoteState.preview}
					onDelete={deleteNote}
					onView={viewNote}
					onEdit={onEditNote}
				/>;
			})}
		</div>
	);
}

export default NoteList;
