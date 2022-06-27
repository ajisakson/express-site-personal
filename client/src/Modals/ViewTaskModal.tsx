import { useFocus } from "../Pages/Dashboard";
import "./ViewTaskModal.scss";

export default function ViewTaskModal() {
	const { data } = useFocus();
	return (
		<div className="view-task" id={data.id}>
			<h1>VIEW TASK</h1>
			<h1>{data.name}</h1>
			<p>{data.description}</p>
			<p>{data.due}</p>
			<p>{data.created}</p>
			<p>{data.updated}</p>
			<p>{data.status}</p>
		</div>
	);
}
