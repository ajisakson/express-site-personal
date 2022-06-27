import axios from "axios";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { useFocus } from "../Pages/Dashboard";
import createToken from "../Services/CreateToken";
import "./EditTaskModal.scss";

export default function EditTaskModal() {
	const { data } = useFocus();

	const taskId = data.id;
	const [taskName, updateTaskName] = useState(data.name);
	const [taskDescription, updateTaskDescription] = useState(data.description);
	const [taskDueDate, updateTaskDueDate] = useState(data.dueDate);
	const [taskStatus, updateTaskStatus] = useState(data.status);

	function setTaskDescription(event: ChangeEvent<HTMLTextAreaElement>) {
		updateTaskDescription(event.target.value);
	}

	function setTaskName(event: ChangeEvent<HTMLInputElement>) {
		updateTaskName(event.target.value);
	}

	function setTaskDueDate(event: ChangeEvent<HTMLInputElement>) {
		updateTaskDueDate(event.target.value);
	}

	async function updateTask() {
		const header = await createToken();
		const payload = {
			id: taskId,
			name: taskName,
			description: taskDescription,
			due_date: taskDueDate,
			status: taskStatus
		};
		try {
			const res = await axios.put(`/api/tasks/`, payload, header).then((e) => {
				// TODO: update the task list
			});
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className="edit-task-modal">
			<div className="edit-task">
				<h2>Edit Task</h2>
				<input value={taskName} type="text" placeholder="Task Name" onChange={setTaskName} />
				<textarea value={taskDescription} placeholder="Task Description" onChange={setTaskDescription} />
				<input value={taskDueDate} type="date" placeholder="Task Due Date" onChange={setTaskDueDate} />
				<div className="button-container">
					<button onClick={updateTask}>Update</button>
					<button onClick={() => {}}>Cancel</button>
				</div>
			</div>
		</div>
	);
}
