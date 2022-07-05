import { DateTime } from "luxon";
import { TaskStatus } from "../Components/Task";
import "./ViewTaskModal.scss";

export default function ViewTaskModal({ data }: any) {
	return (
		<div className={`view-task ${Object.values(TaskStatus)[data.status]}`} id={data.id}>
			<div className="task-title">{data.name}</div>
			<div className="task-contents">
				<div className="task-description">{data.description}</div>
				{data.dueDate && <div>Due: {data.dueDate}</div>}
				<div>{Object.values(TaskStatus)[data.status]}</div>
				<div>Created: {DateTime.fromISO(data.createdDate).toLocaleString(DateTime.DATETIME_MED)}</div>
				<div>Updated: {DateTime.fromISO(data.updatedDate).toLocaleString(DateTime.DATETIME_MED)}</div>
			</div>
		</div>
	);
}
