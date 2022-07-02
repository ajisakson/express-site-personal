import MDEditor from "@uiw/react-md-editor";
import { DateTime } from "luxon";
import "./ViewNoteModal.scss";

export default function ViewNoteModal({ data }: any) {
	return (
		<div className="view-note" id={data.id}>
			<div className="view-note-header">{data.name}</div>
			<MDEditor.Markdown source={data.content} style={{ borderRadius: "4px", padding: "16px" }} />
			<div className="view-note-dates">
				<div>Created: {DateTime.fromISO(data.createdDate).toLocaleString(DateTime.DATETIME_FULL)}</div>
				<div>Updated: {DateTime.fromISO(data.updatedDate).toLocaleString(DateTime.DATETIME_FULL)}</div>
			</div>
		</div>
	);
}
