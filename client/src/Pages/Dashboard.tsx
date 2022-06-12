import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import Task from "../Components/Task";
import AddTaskModal from "../Modals/AddTaskModal";
import EditTaskModal from "../Modals/EditTaskModal";
import createToken from "../Services/CreateToken";
import "./Dashboard.scss";

function Dashboard() {
	const [taskList, updateTaskList] = useState<any[]>([]);
	const [showAddTaskModal, updateShowAddTaskModal] = useState(false);
	const [showEditTaskModal, updateShowEditTaskModal] = useState(false);
	const [selectedTask, updateSelectedTask] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const header = await createToken();
			const res = await axios.get("/api/tasks", header);
			console.log(res.data);
			updateTaskList(res.data);
		};
		fetchData();
	}, []);

	async function createTask(taskName: String, taskDescription: String, taskDueDate: Date) {
		const header = await createToken();
		const payload = {
			name: taskName,
			description: taskDescription,
			due_date: taskDueDate
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

	function viewTask(props: any) {
		updateSelectedTask;
	}

	function onEditTask(props: any) {
		updateSelectedTask(props);
		updateShowEditTaskModal(true);
	}

	async function updateTask(props: any) {
		const header = await createToken();
		const payload = {
			id: props.id,
			name: props.name,
			description: props.description,
			dueDate: props.dueDate
		};
		try {
			const res = await axios.put(`/api/tasks/${props.id}`, payload, header).then(() => {
				const newArray = taskList.filter((task) => task.uuid !== props.id);
				updateTaskList(newArray);
				closeEditTaskModal();
			});
		} catch (e) {
			console.error(e);
		}
	}

	function closeCreateTaskModal() {
		updateShowAddTaskModal(false);
	}

	function closeEditTaskModal() {
		updateShowEditTaskModal(false);
	}

	const AddTaskProps = {
		show: showAddTaskModal,
		close: () => {
			closeCreateTaskModal();
		},
		onCreate: (taskName: String, taskDescription: String, taskDueDate: Date) => {
			createTask(taskName, taskDescription, taskDueDate);
		}
	};

	const EditTaskProps = {
		show: showEditTaskModal,
		close: () => {
			closeEditTaskModal();
		},
		onUpdate: (id: String, taskName: String, taskDescription: String, taskDueDate: Date) => {
			updateTask({ id, taskName, taskDescription, taskDueDate });
		},
		task: selectedTask
	};

	return (
		<div className="dashboard-page">
			<AddTaskModal {...AddTaskProps} />
			<EditTaskModal {...EditTaskProps} />
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
						dueDate={task.due}
						status={task.status}
						onDelete={deleteTask}
						onView={viewTask}
						onEdit={onEditTask}
					/>
				))}
			</div>
			<div className="notes"></div>
		</div>
	);
}

export default Dashboard;
