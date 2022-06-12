import { ChangeEvent, MouseEventHandler, useState } from "react";
import "./AddTaskModal.scss";

export interface AddTaskModalProps {
	show: boolean;
	close: () => void;
	onCreate: (a: String, b: String) => void;
}

export default function AddTaskModal<AddTaskModalProps>(props: any) {
	if (!props.show) return null;

	const [taskName, updateTaskName] = useState("");
	const [taskDescription, updateTaskDescription] = useState("");
	const [taskDueDate, updateTaskDueDate] = useState("");

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
		<div className="add-task-modal">
			<div className="new-task">
				<h2>Add Task</h2>
				<input value={taskName} type="text" placeholder="Task Name" onChange={setTaskName} />
				<textarea value={taskDescription} placeholder="Task Description" onChange={setTaskDescription} />
				<input value={taskDueDate} type="date" placeholder="Task Due Date" onChange={setTaskDueDate} />
				<div className="button-container">
					<button
						onClick={() => {
							props.onCreate(taskName, taskDescription, taskDueDate);
						}}
					>
						Create
					</button>
					<button onClick={props.close}>Cancel</button>
				</div>
			</div>
		</div>
	);
}
