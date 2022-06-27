import axios from "axios";
import { useEffect, useState } from "react";
import { FocusState, useFocus } from "../Pages/Dashboard";
import createToken from "../Services/CreateToken";
import Task from "./Task";
import "./TaskList.scss";

export default function TaskList() {
	const [taskList, updateTaskList] = useState<any[]>([]);

	const { setFocusModal, setData } = useFocus();

	useEffect(() => {
		const fetchData = async () => {
			const header = await createToken();
			const res = await axios.get("/api/tasks", header);
			updateTaskList(res.data);
		};
		fetchData();
	}, []);

	async function deleteTask(id: String) {
		const header = await createToken();
		const res = await axios.delete(`/api/tasks/${id}`, header).then(() => {
			const newArray = taskList.filter((task) => task.uuid !== id);
			updateTaskList(newArray);
		});
	}

	function addTask() {
		setFocusModal(FocusState.ADD_TASK);
		setData({});
	}

	return (
		<div className="task-list">
			<button onClick={addTask}>Create Task</button>
			{taskList.map((task: any, index: number) => (
				<Task
					key={index}
					id={task.uuid}
					name={task.name}
					description={task.description}
					createdDate={task.created}
					updatedDate={task.updated}
					dueDate={task.due}
					status={task.status}
					onDelete={deleteTask}
				/>
			))}
		</div>
	);
}
