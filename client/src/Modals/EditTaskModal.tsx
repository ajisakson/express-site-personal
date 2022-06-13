import { ChangeEvent, MouseEventHandler, useState } from "react";
import "./EditTaskModal.scss";

export interface EditTaskModalProps {
	show: boolean;
	close: () => void;
	onUpdate: (a: String, b: String, c: String, d: Date, e: number) => void;
	task: Object;
}

export default function EditTaskModal<EditTaskModalProps>(props: any) {
	if (!props.show) return null;

	const [taskName, updateTaskName] = useState(props.task.name);
	const [taskDescription, updateTaskDescription] = useState(props.task.description);
	const [taskDueDate, updateTaskDueDate] = useState(props.task.dueDate);
	const [taskStatus, updateTaskStatus] = useState(props.task.status);

	function setTaskDescription(event: ChangeEvent<HTMLTextAreaElement>) {
		updateTaskDescription(event.target.value);
	}

	function setTaskName(event: ChangeEvent<HTMLInputElement>) {
		updateTaskName(event.target.value);
	}

	function setTaskDueDate(event: ChangeEvent<HTMLInputElement>) {
		updateTaskDueDate(event.target.value);
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
							props.onUpdate(props.task.id, taskName, taskDescription, taskDueDate, taskStatus);
						}}
					>
						Update
					</button>
					<button onClick={props.close}>Cancel</button>
				</div>
			</div>
		</div>
	);
}
