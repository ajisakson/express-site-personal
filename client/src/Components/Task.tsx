import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useContext, useEffect, useRef, useState } from "react";
import createToken from "../Services/CreateToken";
import "./Task.scss";
import "react-icons/md";
import { MdDelete, MdModeEdit, MdOutlineVisibility } from "react-icons/md";
import { FocusState, useDashboard } from "../Pages/Dashboard";
import { DateTime } from "luxon";

export const TaskStatus = {
	0: "Todo",
	1: "Active",
	2: "Delegated",
	3: "Complete",
	4: "Cancelled"
};

export interface TaskProps {
	uuid: String;
	name: String;
	description: string;
	createdDate: string;
	updatedDate: string;
	dueDate: string;
	status: number;
	onDelete: Function;
}

function Task({ uuid, name, description, createdDate, updatedDate, dueDate, status, onDelete }: TaskProps) {
	const [taskStatus, setStatus] = useState(status);
	const isMounted = useRef(false);

	function getOptions() {
		return Object.values(TaskStatus).map((value, index) => <option value={index}>{value}</option>);
	}

	function updateStatus(event: ChangeEvent<HTMLSelectElement>) {
		setStatus(parseInt(event.target.value));
	}

	const { setFocusModal, setData } = useDashboard();

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
				id: uuid,
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
		setData({ uuid, name, description, createdDate, updatedDate, dueDate, status });
	}

	function onEdit() {
		setFocusModal(FocusState.EDIT_TASK);
		setData({ uuid, name, description, createdDate, updatedDate, dueDate, status });
	}

	return (
		<div className={`task ${Object.values(TaskStatus)[taskStatus]}`}>
			<div className="row-container">
				<div className="task-info">
					<div>{name}</div>
				</div>
				<div className="task-date-info">
					{dueDate && <p>Due: {DateTime.fromISO(dueDate).toLocaleString(DateTime.DATE_MED)}</p>}
				</div>
				<select defaultValue={taskStatus} onChange={updateStatus}>
					{getOptions()}
				</select>
			</div>
			<div className="button-container">
				<button onClick={() => onView()}>
					<MdOutlineVisibility />
				</button>
				<button onClick={() => onEdit()}>
					<MdModeEdit />
				</button>
				<button onClick={() => onDelete(uuid)}>
					<MdDelete />
				</button>
			</div>
		</div>
	);
}

export default Task;
