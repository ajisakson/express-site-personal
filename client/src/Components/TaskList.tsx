import axios from "axios";
import { useEffect, useState } from "react";
import { FocusState, useDashboard } from "../Pages/Dashboard";
import createToken from "../Services/CreateToken";
import Task from "./Task";
import "./TaskList.scss";

export default function TaskList() {
	const { setFocusModal, setData, tasks, setTasks } = useDashboard();

	async function deleteTask(id: String) {
		const header = await createToken();
		const res = await axios.delete(`/api/tasks/${id}`, header).then(() => {
			const newArray = tasks.filter((task) => task.uuid !== id);
			setTasks(newArray);
		});
	}

	function addTask() {
		setFocusModal(FocusState.ADD_TASK);
		setData({});
	}

	return (
		<div className="task-list">
			<div className="task-list-header">
				Tasks
				<button id="add-task-button" onClick={addTask}>
					+
				</button>
			</div>
			{tasks.map((task: any, index: number) => (
				<Task
					key={index}
					id={task.uuid}
					name={task.name}
					description={task.description}
					createdDate={task.created}
					updatedDate={task.updated}
					dueDate={task.due}
					status={task.status}
					onDelete={deleteTask}
				/>
			))}
		</div>
	);
}
