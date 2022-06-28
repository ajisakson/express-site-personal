import MDEditor from "@uiw/react-md-editor";
import { useFocus } from "../Pages/Dashboard";
import "./ViewNoteModal.scss";

export default function ViewNoteModal({ data }: any) {
	// const { data } = useFocus();
	return (
		<div className="view-note" id={data.id}>
			<div className="view-note-header">{data.name}</div>
			<MDEditor.Markdown
				source={data.content}
				style={{ borderRadius: "4px", padding: "16px", whiteSpace: "pre-wrap" }}
			/>
			<p>Created: {data.createdDate}</p>
			<p>Last Updated: {data.updatedDate}</p>
		</div>
	);
}
