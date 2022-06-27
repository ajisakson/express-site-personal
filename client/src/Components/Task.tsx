import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useContext, useEffect, useRef, useState } from "react";
import createToken from "../Services/CreateToken";
import "./Task.scss";
import "react-icons/md";
import { MdDelete, MdModeEdit, MdOutlineVisibility } from "react-icons/md";
import { FocusState, useFocus } from "../Pages/Dashboard";

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
}

function Task({ id, name, description, createdDate, updatedDate, dueDate, status, onDelete }: TaskProps) {
	const [taskStatus, setStatus] = useState(status);
	const isMounted = useRef(false);

	function getOptions() {
		return Object.values(TaskStatus).map((value, index) => <option value={index}>{value}</option>);
	}

	function updateStatus(event: ChangeEvent<HTMLSelectElement>) {
		setStatus(parseInt(event.target.value));
	}

	const { setFocusModal, setData } = useFocus();

	useEffect(() => {
		if (isMounted.current) {
			saveTask();
		} else {
			isMounted.current = true;
		}
	}, [taskStatus]);

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

	function onView() {
		setFocusModal(FocusState.VIEW_TASK);
		setData({ id, name, description, createdDate, updatedDate, dueDate, status });
	}

	function onEdit() {
		setFocusModal(FocusState.EDIT_TASK);
		setData({ id, name, description, createdDate, updatedDate, dueDate, status });
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
				<button onClick={() => onView()}>
					<MdOutlineVisibility />
				</button>
				<button onClick={() => onEdit()}>
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
