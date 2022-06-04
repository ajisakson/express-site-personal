import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import Task from "../Components/Task";
import AddTaskModal from "../Modals/AddTaskModal";
import createToken from "../Services/CreateToken";
import "./Dashboard.scss";

function Dashboard() {
	const [taskList, updateTaskList] = useState<any[]>([]);
	const [showAddTaskModal, updateShowAddTaskModal] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const header = await createToken();
			const res = await axios.get("/api/tasks", header);
			console.log(res);
			updateTaskList(res.data);
		};
		fetchData();
	}, []);

	async function createTask(taskName: String, taskDescription: String) {
		const header = await createToken();
		const payload = {
			name: taskName,
			description: taskDescription
		};
		try {
			const res = await axios.post("/api/tasks", payload, header);
			updateTaskList((taskList) => [res.data.task, ...taskList]);
			closeCreateTaskModal();
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

	function closeCreateTaskModal() {
		updateShowAddTaskModal(false);
	}

	const AddTaskProps = {
		show: showAddTaskModal,
		close: () => {
			closeCreateTaskModal();
		},
		onCreate: (taskName: String, taskDescription: String) => {
			createTask(taskName, taskDescription);
		}
	};

	return (
		<div className="dashboard-page">
			<AddTaskModal {...AddTaskProps} />
			<button
				onClick={() => {
					updateShowAddTaskModal(true);
				}}
			>
				Create Task
			</button>
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
