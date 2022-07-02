import { MdOutlineVisibility, MdModeEdit, MdDelete } from "react-icons/md";
import { FocusState, useDashboard } from "../Pages/Dashboard";
import { DateTime } from "luxon";
import "./Note.scss";

export interface NoteProps {
	id: string;
	name: string;
	content: string;
	createdDate: Date;
	updatedDate: Date;
	onDelete: Function;
}

function Note({ id, name, content, createdDate, updatedDate, onDelete }: NoteProps) {
	const { setData, setFocusModal } = useDashboard();

	function onView() {
		setFocusModal(FocusState.VIEW_NOTE);
		setData({ id, name, content, createdDate, updatedDate });
	}
	function onEdit() {
		setFocusModal(FocusState.EDIT_NOTE);
		setData({ id, name, content, createdDate, updatedDate });
	}

	return (
		<div className="note" id={id}>
			<div className="row-container">
				<div className="note-name">{name ? name : `Updated: ${updatedDate}`}</div>
				<div className="updated-date">{DateTime.fromISO(updatedDate).toLocaleString(DateTime.DATE_MED)}</div>
			</div>
			<div className="button-container">
				<button onClick={() => onView()}>
					<MdOutlineVisibility />
				</button>
				<button onClick={() => onEdit()}>
					<MdModeEdit />
				</button>
				<button onClick={() => onDelete(id)}>
					<MdDelete />
				</button>
			</div>
		</div>
	);
}

export default Note;
