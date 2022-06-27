import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";
import createToken from "../Services/CreateToken";
import "./AddNoteModal.scss";

export default function AddNoteModal({ data }: any) {
	const editorRef = useRef(null);
	const [noteName, updateNoteName] = useState("");

	const cancel = () => {
		console.log("cancel?");
	};

	function setNoteName(event: ChangeEvent<HTMLInputElement>) {
		updateNoteName(event.target.value);
	}

	async function createNote() {
		const header = await createToken();
		const payload = {
			name: noteName,
			content: editorRef.current?.getContent()
		};
		try {
			const res = await axios.post("/api/notes", payload, header);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className="add-note">
			<input type="text" placeholder="Enter Title Here" onChange={setNoteName} />
			<Editor
				apiKey="ydj4d2orswa7trvv0onl39ecafbntamlkbxnhmdwwc4femv2"
				// @ts-ignore
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue="<p>This is the initial content of the editor.</p>"
				init={{
					height: 500,
					menubar: true,
					plugins: [
						"advlist",
						"autolink",
						"lists",
						"link",
						"image",
						"charmap",
						"preview",
						"anchor",
						"searchreplace",
						"visualblocks",
						"code",
						"fullscreen",
						"insertdatetime",
						"media",
						"table",
						"code",
						"help",
						"wordcount"
					],
					toolbar:
						"undo redo | blocks | " +
						"bold italic forecolor | alignleft aligncenter " +
						"alignright alignjustify | bullist numlist outdent indent | " +
						"removeformat | code | help",
					content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
				}}
			/>
			<button onClick={createNote}>Save Note</button>
			<button onClick={cancel}>Cancel</button>
		</div>
	);
}
