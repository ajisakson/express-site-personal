import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { MdCheck } from "react-icons/md";
import LoadingIcons from "react-loading-icons";
import { useDashboard } from "../Pages/Dashboard";
import createToken from "../Services/CreateToken";
import "./AddNoteModal.scss";

export default function AddNoteModal({ data }: any) {
	const [noteName, updateNoteName] = useState("");
	const [noteMD, updateNoteMD] = useState("Start writing!");
	const [saveButtonText, updateSaveButtonText] = useState(<MdCheck />);
	const { notes, setNotes } = useDashboard();

	function setNoteName(event: ChangeEvent<HTMLInputElement>) {
		updateNoteName(event.target.value);
		updateSaveButtonText(<MdCheck />);
	}

	function setNoteMD(value: any) {
		updateNoteMD(value);
		updateSaveButtonText(<MdCheck />);
	}

	async function createNote() {
		updateSaveButtonText(<LoadingIcons.TailSpin height="32px" width="32px" />);
		const header = await createToken();
		const payload = {
			name: noteName,
			content: noteMD
		};
		try {
			const res = await axios.post("/api/notes", payload, header).then((result) => {
				updateSaveButtonText(<MdCheck color="green" />);
				setNotes([result.data.note, ...notes]);
			});
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className="add-note">
			<div className="add-note-header">
				<input id="title-input" type="text" placeholder="Enter Title Here" onChange={setNoteName} />
				<button id="save-button" onClick={createNote}>
					{saveButtonText}
				</button>
			</div>
			<MDEditor
				value={noteMD}
				onChange={setNoteMD}
				autoFocus={true}
				tabSize={4}
				minHeight={400}
				height={400}
				style={{ padding: "16px", borderRadius: "4px" }}
			/>
		</div>
	);
}
