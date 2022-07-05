import axios from "axios";
import { useState } from "react";
import { MdArrowLeft, MdArrowRight, MdChecklist } from "react-icons/md";
import { FocusState, useDashboard } from "../Pages/Dashboard";
import createToken from "../Services/CreateToken";
import Task from "./Task";
import "./TaskList.scss";

export default function TaskList() {
	const { setFocusModal, setData, tasks, setTasks } = useDashboard();
	const [listCollapsed, setListCollapsed] = useState(false);

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
		<div id="task-list">
			<div id="task-list-header">
				<button
					id="collapse-button"
					onClick={() => {
						setListCollapsed(!listCollapsed);
					}}
				>
					{!listCollapsed ? <MdArrowLeft /> : <MdArrowRight />}
				</button>
				{listCollapsed ? <MdChecklist /> : "Tasks"}
				{!listCollapsed && (
					<button id="add-task-button" onClick={addTask}>
						+
					</button>
				)}
			</div>
			<div id="task-list-main" className={listCollapsed ? "closed" : "open"}>
				{tasks.map((task: any, index: number) => (
					<Task
						uuid={task.uuid}
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
		</div>
	);
}
