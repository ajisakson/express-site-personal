import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import createToken from "../Services/CreateToken";
import "./Task.scss";

export const TaskStatus = {
	0: "Todo",
	1: "Active",
	2: "Delegated",
	3: "Complete",
	4: "Cancelled"
};

export interface TaskProps {
	id: string;
	name: string;
	description: string;
	createdDate: string;
	updatedDate: string;
	status: number;
	onDelete: Function;
}

function Task({ id, name, description, createdDate, updatedDate, status, onDelete }: TaskProps) {
	const [taskStatus, setStatus] = useState(status);

	async function editTask() {
		const header = await createToken();
		axios.get("/api/tasks", header);
	}

	function getOptions() {
		return Object.values(TaskStatus).map((value, index) => <option value={index}>{value}</option>);
	}

	function updateStatus(event: ChangeEvent<HTMLSelectElement>) {
		setStatus(parseInt(event.target.value));
	}

	return (
		<div className="task">
			<div className="row-container">
				<div className={`status-container ${Object.values(TaskStatus)[taskStatus]}`}></div>
				<div className="task-info">
					<h2>{name}</h2>
					<h3>{description}</h3>
				</div>
				<div className="task-date-info">
					<p>{createdDate}</p>
					<p>{updatedDate}</p>
				</div>
			</div>
			<div className="button-container">
				<button onClick={editTask}>Edit</button>
				<button onClick={() => onDelete(id)}>Delete</button>
				<select defaultValue={taskStatus} onChange={updateStatus}>
					{getOptions()}
				</select>
			</div>
		</div>
	);
}

export default Task;
