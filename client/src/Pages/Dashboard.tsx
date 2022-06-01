import NewTask from "../Components/NewTask";
import Task, { TaskStatus } from "../Components/Task";
import "./Dashboard.scss";

function Dashboard() {
	return (
		<div className="dashboard-page">
			<div className="tasks">
				<NewTask />
				<Task
					key="a1"
					name="New Task"
					description="new task description!!! wooooo"
					createdDate={new Date()}
					updatedDate={new Date()}
					status={TaskStatus[2]}
				/>
				<Task
					key="a2"
					name="New Task"
					description="new task description!!! wooooo"
					createdDate={new Date()}
					updatedDate={new Date()}
					status={TaskStatus[2]}
				/>
				<Task
					key="a3"
					name="New Task"
					description="new task description!!! wooooo"
					createdDate={new Date()}
					updatedDate={new Date()}
					status={TaskStatus[2]}
				/>
			</div>
			<div className="notes"></div>
		</div>
	);
}

export default Dashboard;
