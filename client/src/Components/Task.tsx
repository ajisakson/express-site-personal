import { ChangeEvent, ChangeEventHandler, useState } from "react";

export const TaskStatus = {
	0: "Todo",
	1: "Active",
	2: "Delegated",
	3: "Complete",
	4: "Cancelled"
};

export interface TaskProps {
	key: string;
	name: string;
	description: string;
	createdDate: Date;
	updatedDate: Date;
	status: string;
}

function Task({ key, name, description, createdDate, updatedDate, status }: TaskProps) {
	const [taskStatus, setStatus] = useState(status);

	function editTask() {
		console.log("edit this task?");
	}

	function deleteTask() {
		console.log("delete this task?");
	}

	function getOptions() {
		return Object.values(TaskStatus).map((value) => <option value={value}>{value}</option>);
	}

	function updateStatus(event: ChangeEvent<HTMLSelectElement>) {
		setStatus(event.target.value);
	}

	return (
		<div className="task">
			<h2>{name}</h2>
			<h3>{description}</h3>
			<p>{createdDate.toLocaleString()}</p>
			<p>{updatedDate.toLocaleString()}</p>
			<p>{taskStatus}</p>
			<button onClick={editTask}>Edit</button>
			<button onClick={deleteTask}>Delete</button>
			<select defaultValue={taskStatus} onChange={updateStatus}>
				{getOptions()}
			</select>
		</div>
	);
}

export default Task;
