import AddNoteModal from "../Modals/AddNoteModal";
import AddTaskModal from "../Modals/AddTaskModal";
import EditNoteModal from "../Modals/EditNoteModal";
import EditTaskModal from "../Modals/EditTaskModal";
import ViewNoteModal from "../Modals/ViewNoteModal";
import ViewTaskModal from "../Modals/ViewTaskModal";
import { FocusState, useFocus } from "../Pages/Dashboard";
import "./DashboardFocus.scss";

export default function DashboardFocus() {
	const { focusModal } = useFocus();

	return (
		<div className="dashboard-focus">
			{focusModal === FocusState.ADD_TASK && <AddTaskModal />}
			{focusModal === FocusState.EDIT_TASK && <EditTaskModal />}
			{focusModal === FocusState.VIEW_TASK && <ViewTaskModal />}
			{focusModal === FocusState.ADD_NOTE && <AddNoteModal />}
			{focusModal === FocusState.EDIT_NOTE && <EditNoteModal />}
			{focusModal === FocusState.VIEW_NOTE && <ViewNoteModal />}
		</div>
	);
}
