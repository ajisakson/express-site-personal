import { useState } from "react";
import { useDrag } from "react-dnd";
import DashboardFocus from "../Components/DashboardFocus";
import NoteList from "../Components/NoteList";
import TaskList from "../Components/TaskList";
import "./Dashboard.scss";

function Dashboard() {
	const [selectedTask, updateSelectedTask] = useState({});
	const [dashboardState, updateDashboardState] = useState(3);

	return (
		<div className="dashboard-page">
			<div className="main-ui">
				<TaskList />
				<DashboardFocus data={selectedTask} state={dashboardState} />
				<NoteList />
			</div>
		</div>
	);
}

export default Dashboard;
