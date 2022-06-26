import { useEffect } from "react";
import AddNoteModal from "../Modals/AddNoteModal";
import AddTaskModal from "../Modals/AddTaskModal";
import EditNoteModal from "../Modals/EditNoteModal";
import EditTaskModal from "../Modals/EditTaskModal";
import ViewNoteModal from "../Modals/ViewNoteModal";
import ViewTaskModal from "../Modals/ViewTaskModal";
import "./DashboardFocus.scss";

export enum FocusState {
	ADD_TASK,
	EDIT_TASK,
	VIEW_TASK,
	ADD_NOTE,
	EDIT_NOTE,
	VIEW_NOTE
}

export default function DashboardFocus(data: any, state: number) {
	useEffect(() => {
		renderSwitch();
	}, [state]);

	function renderSwitch() {
		switch (state) {
			case FocusState.ADD_TASK:
				return <AddTaskModal />;
			case FocusState.EDIT_TASK:
				return <EditTaskModal task={data} />;
			case FocusState.VIEW_TASK:
				return <ViewTaskModal task={data} />;
			case FocusState.ADD_NOTE:
				return <AddNoteModal />;
			case FocusState.EDIT_NOTE:
				return <EditNoteModal note={data} />;
			case FocusState.VIEW_NOTE:
				return <ViewNoteModal note={data} />;

			default:
				return <AddNoteModal />;
		}
	}

	return <div className="dashboard-focus">{renderSwitch()}</div>;
}
