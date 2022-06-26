import axios from "axios";
import { useEffect, useState } from "react";
import createToken from "../Services/CreateToken";
import Task from "./Task";
import "./TaskList.scss";

export default function TaskList() {
	const [taskList, updateTaskList] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const header = await createToken();
			const res = await axios.get("/api/tasks", header);
			updateTaskList(res.data);
		};
		fetchData();
	}, []);

	async function deleteTask(id: String) {
		const header = await createToken();
		const res = await axios.delete(`/api/tasks/${id}`, header).then(() => {
			const newArray = taskList.filter((task) => task.uuid !== id);
			updateTaskList(newArray);
		});
	}

	function viewTask(
		id: String,
		name: String,
		description: String,
		created: Date,
		updated: Date,
		due: Date,
		status: number
	) {
		// TODO: send this to the DashboardFocus?
		console.log(id, name, description, created, updated, due, status);
	}

	function editTask(
		id: String,
		name: String,
		description: String,
		created: Date,
		updated: Date,
		due: Date,
		status: number
	) {
		// TODO: send this to the DashboardFocus?
		console.log(id, name, description, created, updated, due, status);
	}

	function addTask() {
		// TODO: send this to the DashboardFocus?
		console.log("add a task");
	}

	return (
		<div className="task-list">
			<button onClick={addTask}>Create Task</button>
			{taskList.map((task: any) => (
				<Task
					key={task.uuid}
					id={task.uuid}
					name={task.name}
					description={task.description}
					createdDate={task.created}
					updatedDate={task.updated}
					dueDate={task.due}
					status={task.status}
					onDelete={deleteTask}
					onView={viewTask}
					onEdit={editTask}
				/>
			))}
		</div>
	);
}
