import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useDashboard } from "../Pages/Dashboard";
import createToken from "../Services/CreateToken";
import "./EditNoteModal.scss";

export default function EditNoteModal({ data }: any) {
	const [noteName, updateNoteName] = useState(data.name);
	const [noteMD, updateNoteMD] = useState(data.content);
	const [saveButtonText, updateSaveButtonText] = useState("Save");
	const { notes, setNotes } = useDashboard();

	useEffect(() => {
		updateNoteName(data.name);
		updateNoteMD(data.content);
	}, [data]);

	async function saveNote() {
		updateSaveButtonText("Saving...");
		const header = await createToken();
		axios
			.put(
				`/api/notes/`,
				{
					id: data.id,
					name: noteName,
					content: noteMD
				},
				header
			)
			.then((res) => {
				updateSaveButtonText("Saved!");
				setNotes(
					notes.map((note: any) => {
						if (note.uuid === res.data.note.uuid) {
							note.name = res.data.note.name;
							note.content = res.data.note.content;
							note.updated = res.data.note.updated;
						}
						return note;
					})
				);
			});
	}

	const cancel = () => {
		console.log("cancel?");
	};

	function setNoteName(event: ChangeEvent<HTMLInputElement>) {
		updateNoteName(event.target.value);
		updateSaveButtonText("Save");
	}

	function setNoteMD(value: any) {
		updateNoteMD(value);
		updateSaveButtonText("Save");
	}

	return (
		<div className="edit-note" id={data.id}>
			<input id="title-input" type="text" placeholder="Enter Title Here" value={noteName} onChange={setNoteName} />
			<MDEditor
				value={noteMD}
				onChange={setNoteMD}
				autoFocus={true}
				tabSize={4}
				minHeight={400}
				height={400}
				style={{ padding: "16px", borderRadius: "4px" }}
			/>
			<div>
				<button id="save-button" onClick={saveNote}>
					{saveButtonText}
				</button>
				<button id="cancel-button" onClick={cancel}>
					<MdCancel />
				</button>
			</div>
		</div>
	);
}
