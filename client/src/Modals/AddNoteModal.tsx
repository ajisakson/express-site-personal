import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import "./AddNoteModal.scss";

export default function AddNoteModal() {
	const editorRef = useRef(null);
	const log = () => {
		if (editorRef.current) {
			// @ts-ignore
			console.log(editorRef.current.getContent());
		}
	};
	const cancel = () => {
		console.log("cancel?");
	};
	return (
		<div>
			<input type="text" placeholder="Enter Title Here" />
			<Editor
				apiKey="ydj4d2orswa7trvv0onl39ecafbntamlkbxnhmdwwc4femv2"
				// @ts-ignore
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue="<p>This is the initial content of the editor.</p>"
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
