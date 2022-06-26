import axios from "axios";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import createToken from "../Services/CreateToken";
import "./EditTaskModal.scss";

export default function EditTaskModal(task: any) {
	const [taskName, updateTaskName] = useState(task.name);
	const [taskDescription, updateTaskDescription] = useState(task.description);
	const [taskDueDate, updateTaskDueDate] = useState(task.dueDate);
	const [taskStatus, updateTaskStatus] = useState(task.status);

	const id = task.id;

	function setTaskDescription(event: ChangeEvent<HTMLTextAreaElement>) {
		updateTaskDescription(event.target.value);
	}

	function setTaskName(event: ChangeEvent<HTMLInputElement>) {
		updateTaskName(event.target.value);
	}

	function setTaskDueDate(event: ChangeEvent<HTMLInputElement>) {
		updateTaskDueDate(event.target.value);
	}

	async function updateTask(props: any) {
		console.log(props);
		const header = await createToken();
		const payload = {
			id: id,
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
					<button
						onClick={() => {
							updateTask({ id, taskName, taskDescription, taskDueDate, taskStatus });
						}}
					>
						Update
					</button>
					<button onClick={() => {}}>Cancel</button>
				</div>
			</div>
		</div>
	);
}
