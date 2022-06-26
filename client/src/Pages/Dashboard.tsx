import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import Note, { NoteState } from "../Components/Note";
import Task from "../Components/Task";
import AddTaskModal from "../Modals/AddTaskModal";
import EditTaskModal from "../Modals/EditTaskModal";
import createToken from "../Services/CreateToken";
import "./Dashboard.scss";

function Dashboard() {
	const [taskList, updateTaskList] = useState<any[]>([]);
	const [noteList, updateNoteList] = useState<any[]>([]);
	const [showAddTaskModal, updateShowAddTaskModal] = useState(false);
	const [showEditTaskModal, updateShowEditTaskModal] = useState(false);
	const [showViewTaskModal, updateShowViewTaskModal] = useState(false);
	const [selectedTask, updateSelectedTask] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const header = await createToken();
			const res = await axios.get("/api/tasks", header);
			updateTaskList(res.data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const header = await createToken();
			const res = await axios.get("/api/notes", header);
			updateNoteList(res.data);
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
		updateSelectedTask(props);
		updateShowViewTaskModal(true);
	}

	function onEditTask(props: any) {
		updateSelectedTask(props);
		updateShowEditTaskModal(true);
	}

	async function updateTask(props: any) {
		console.log(props);
		const header = await createToken();
		const payload = {
			id: props.id,
			name: props.name,
			description: props.description,
			due_date: props.dueDate,
			status: props.status
		};
		try {
			const res = await axios.put(`/api/tasks/`, payload, header).then((e) => {
				const index = taskList.findIndex((task) => task.uuid === props.id);
				taskList[index] = {
					id: props.id,
					name: props.name,
					description: props.description,
					due: props.dueDate,
					status: props.status
				};
				updateTaskList(taskList);
				closeEditTaskModal();
			});
		} catch (e) {
			console.error(e);
		}
	}

	function deleteNote() {}
	function viewNote() {}
	function onEditNote() {}

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
		onUpdate: (id: String, taskName: String, taskDescription: String, taskDueDate: Date, taskStatus: number) => {
			updateTask({ id, taskName, taskDescription, taskDueDate, taskStatus });
		},
		task: selectedTask
	};

	return (
		<div className="dashboard-page">
			<AddTaskModal {...AddTaskProps} />
			<EditTaskModal {...EditTaskProps} />
			<div className="main-ui">
				<div className="tasks">
					<button
						onClick={() => {
							updateShowAddTaskModal(true);
						}}
					>
						Create Task
					</button>
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
				<div className="notes">
					<button
						onClick={() => {
							updateShowAddTaskModal(true);
						}}
					>
						Create Note
					</button>
					{noteList.map((note: any) => {
						<Note
							key={note.uuid}
							id={note.uuid}
							name={note.name}
							contents={note.contents}
							createdDate={note.created}
							updatedDate={note.updated}
							state={NoteState.preview}
							onDelete={deleteNote}
							onView={viewNote}
							onEdit={onEditNote}
						/>;
					})}
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
