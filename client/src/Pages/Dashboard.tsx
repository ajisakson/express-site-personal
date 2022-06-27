import React, { createContext, useContext } from "react";
import { useState } from "react";
import { useDrag } from "react-dnd";
import DashboardFocus from "../Components/DashboardFocus";
import NoteList from "../Components/NoteList";
import TaskList from "../Components/TaskList";
import "./Dashboard.scss";

export enum FocusState {
	ADD_TASK,
	EDIT_TASK,
	VIEW_TASK,
	ADD_NOTE,
	EDIT_NOTE,
	VIEW_NOTE
}

export interface FocusInterface {
	focusModal: FocusState;
	setFocusModal: React.Dispatch<React.SetStateAction<FocusState>>;
	data: Record<string, any>;
	setData: React.Dispatch<React.SetStateAction<{}>>;
}

export const FocusContext = createContext({} as FocusInterface);
export const useFocus = () => useContext(FocusContext);

function Dashboard() {
	const [focusModal, setFocusModal] = useState(FocusState.ADD_NOTE);
	const [data, setData] = useState({});
	const value: FocusInterface = { focusModal, setFocusModal, data, setData };

	return (
		<FocusContext.Provider value={value}>
			<div className="dashboard-page">
				<div className="main-ui">
					<TaskList />
					<DashboardFocus />
					<NoteList />
				</div>
			</div>
		</FocusContext.Provider>
	);
}

export default Dashboard;
