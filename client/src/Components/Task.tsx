import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import createToken from "../Services/CreateToken";
import "./Task.scss";
import "react-icons/md";
import { MdDelete, MdModeEdit, MdOutlineVisibility } from "react-icons/md";

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
	createdDate: Date;
	updatedDate: Date;
	dueDate: Date;
	status: number;
	onDelete: Function;
	onView: Function;
	onEdit: Function;
}

function Task({ id, name, description, createdDate, updatedDate, dueDate, status, onDelete, onView, onEdit }: TaskProps) {
	const [taskStatus, setStatus] = useState(status);

	function getOptions() {
		return Object.values(TaskStatus).map((value, index) => <option value={index}>{value}</option>);
	}

	function updateStatus(event: ChangeEvent<HTMLSelectElement>) {
		setStatus(parseInt(event.target.value));
	}

	// TODO: figure out how to prevent this from firing when the page is first opened?
	useEffect(() => {
		// saveTask();
	});

	async function saveTask() {
		const header = await createToken();
		axios.put(
			`/api/tasks/`,
			{
				id: id,
				name: name,
				description: description,
				due_date: dueDate,
				status: taskStatus
			},
			header
		);
	}

	return (
		<div className="task">
			<div className="row-container">
				<div className={`status-container ${Object.values(TaskStatus)[taskStatus]}`}></div>
				<div className="task-info">
					<div>{name}</div>
					{/* <p>{description}</p> */}
				</div>
				<div className="task-date-info">
					{dueDate && <p>{new Date(dueDate).toLocaleDateString()}</p>}
					{/* <p>{createdDate}</p> */}
					{/* <p>{updatedDate}</p> */}
				</div>
			</div>
			<div className="button-container">
				<button onClick={() => onView({ id, name, description, createdDate, updatedDate, dueDate, status })}>
					<MdOutlineVisibility />
				</button>
				<button onClick={() => onEdit({ id, name, description, dueDate, status })}>
					<MdModeEdit />
				</button>
				<button onClick={() => onDelete(id)}>
					<MdDelete />
				</button>
				<select defaultValue={taskStatus} onChange={updateStatus}>
					{getOptions()}
				</select>
			</div>
		</div>
	);
}

export default Task;
