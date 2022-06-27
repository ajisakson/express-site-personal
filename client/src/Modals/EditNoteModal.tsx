import { Editor } from "@tinymce/tinymce-react";
import { ChangeEvent, useRef, useState } from "react";
import { useFocus } from "../Pages/Dashboard";
import "./EditNoteModal.scss";

export default function EditNoteModal({ data }: any) {
	// const { data } = useFocus();
	const [noteName, updateNoteName] = useState(data.name);
	const editorRef = useRef(null);
	const log = () => {
		if (editorRef.current) {
			// @ts-ignore
			console.log(noteName, editorRef.current.getContent());
		}
	};
	const cancel = () => {
		console.log("cancel?");
	};

	function setNoteName(event: ChangeEvent<HTMLInputElement>) {
		updateNoteName(event.target.value);
	}

	return (
		<div className="edit-note" id={data.id}>
			<input type="text" placeholder="Enter Title Here" value={noteName} onChange={setNoteName} />
			<Editor
				apiKey="ydj4d2orswa7trvv0onl39ecafbntamlkbxnhmdwwc4femv2"
				// @ts-ignore
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue={data.content}
				init={{
					height: 500,
					menubar: false,
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
						"removeformat | help",
					content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
				}}
			/>
			<button onClick={log}>Save Note</button>
			<button onClick={cancel}>Cancel</button>
		</div>
	);
}
