import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import Task from "../Components/Task";
import createToken from "../Services/CreateToken";
import "./Dashboard.scss";

function Dashboard() {
	const [taskList, updateTaskList] = useState<any[]>([]);
	const [taskName, updateTaskName] = useState("");
	const [taskDescription, updateTaskDescription] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const header = await createToken();
			const res = await axios.get("/api/tasks", header);
			console.log(res);
			updateTaskList(res.data);
		};
		fetchData();
	}, []);

	async function createTask() {
		const header = await createToken();
		const payload = {
			name: taskName,
			description: taskDescription
		};
		try {
			const res = await axios.post("/api/tasks", payload, header);
			clearCreate();
			updateTaskList((taskList) => [res.data.task, ...taskList]);
		} catch (e) {
			console.error(e);
		}
	}

	async function deleteTask(id: String) {
		const header = await createToken();
		const res = await axios.delete(`/api/tasks/${id}`, header).then(() => {
			const newArray = taskList.filter((task) => task.uuid !== id);
			updateTaskList(newArray);
		});
	}

	const clearCreate = () => {
		updateTaskDescription("");
		updateTaskName("");
	};

	function setTaskDescription(event: ChangeEvent<HTMLTextAreaElement>) {
		updateTaskDescription(event.target.value);
	}

	function setTaskName(event: ChangeEvent<HTMLInputElement>) {
		updateTaskName(event.target.value);
	}

	return (
		<div className="dashboard-page">
			<div className="new-task">
				<h2>Add Task</h2>
				<input value={taskName} type="text" placeholder="Task Name" onChange={setTaskName} />
				<textarea value={taskDescription} placeholder="Task Description" onChange={setTaskDescription} />
				<div className="button-container">
					<button onClick={createTask}>Create</button>
					<button onClick={clearCreate}>Cancel</button>
				</div>
			</div>
			<div className="tasks">
				{taskList.map((task: any) => (
					<Task
						key={task.uuid}
						id={task.uuid}
						name={task.name}
						description={task.description}
						createdDate={task.created}
						updatedDate={task.updated}
						status={task.status}
						onDelete={deleteTask}
					/>
				))}
			</div>
			<div className="notes"></div>
		</div>
	);
}

export default Dashboard;
