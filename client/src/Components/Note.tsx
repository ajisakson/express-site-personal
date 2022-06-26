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
	const editorRef = useRef(null);
	const [noteState, updateNoteState] = useState(state || NoteState[0]);
	const log = () => {
		if (editorRef.current) {
			// @ts-ignore
			console.log(editorRef.current.getContent());
		}
	};
	const cancel = () => {
		updateNoteState("view");
	};
	return (
		<div className="note">
			{noteState == "preview" && (
				<div className="note-preview">
					<h1>{name}</h1>
					<div>{contents}</div>
				</div>
			)}
			{noteState == "view" && (
				<div className="note-view">
					<h1>{name}</h1>
					<div>{contents}</div>
					<p>Created: {new Date(createdDate).toLocaleDateString()}</p>
					<p>Updated: {new Date(updatedDate).toLocaleDateString()}</p>
				</div>
			)}
			{noteState == "edit" && (
				<div className="note-edit">
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
			)}
		</div>
	);
}

export default Note;
