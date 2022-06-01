import { ChangeEvent, useRef, useState } from "react";
import Task, { TaskStatus } from "./Task";

function NewTask() {
	const [taskName, updateTaskName] = useState("");
	const [taskDescription, updateTaskDescription] = useState("");

	function createTask() {
		return (
			<Task
				key="idk"
				name={taskName}
				description={taskDescription}
				createdDate={new Date()}
				updatedDate={new Date()}
				status={TaskStatus[2]}
			/>
		);
	}

	const cancelCreate = () => {
		updateTaskDescription("");
		updateTaskName("");
	};

	function setTaskDescription(event: ChangeEvent<HTMLInputElement>) {
		updateTaskDescription(event.target.value);
	}

	function setTaskName(event: ChangeEvent<HTMLInputElement>) {
		updateTaskName(event.target.value);
	}

	return (
		<div className="new-task">
			<h2>Add Task</h2>
			<input value={taskName} type="text" placeholder="Task Name" onChange={setTaskName} />
			<input value={taskDescription} type="text" placeholder="Task Description" onChange={setTaskDescription} />
			<button onClick={createTask}>Create</button>
			<button onClick={cancelCreate}>Cancel</button>
		</div>
	);
}

export default NewTask;
