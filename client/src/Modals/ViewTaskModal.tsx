import { TaskStatus } from "../Components/Task";
import "./ViewTaskModal.scss";

export default function ViewTaskModal({ data }: any) {
	console.log(data);
	return (
		<div className="view-task" id={data.id}>
			<h1>VIEW TASK</h1>
			<h1>{data.name}</h1>
			<p>{data.description}</p>
			<p>Due: {data.dueDate}</p>
			<p>Created: {data.createdDate}</p>
			<p>Last Updated: {data.updatedDate}</p>
			<p>{Object.values(TaskStatus)[data.status]}</p>
		</div>
	);
}
