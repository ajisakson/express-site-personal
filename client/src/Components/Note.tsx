import { MdOutlineVisibility, MdModeEdit, MdDelete } from "react-icons/md";
import { FocusState, useDashboard } from "../Pages/Dashboard";
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

	function mdUpdated(date: Date) {
		date = new Date(date);
		const day = date.getDate();
		const month = date.getMonth();
		return `${day} ${month}`;
	}

	return (
		<div className="note" id={id}>
			<div>{name ? name : `Updated: ${updatedDate}`}</div>
			<div>{mdUpdated(updatedDate)}</div>
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
