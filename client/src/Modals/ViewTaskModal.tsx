import "./ViewTaskModal.scss";

export default function ViewTaskModal(task: any) {
	return (
		<div>
			<h1>{task.name}</h1>
			<p>{task.description}</p>
			<p>{task.due}</p>
			<p>{task.created}</p>
			<p>{task.updated}</p>
			<p>{task.status}</p>
		</div>
	);
}
