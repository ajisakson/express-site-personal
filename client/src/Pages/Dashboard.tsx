import axios from "axios";
import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../App";
import DashboardFocus from "../Components/DashboardFocus";
import { NoteProps } from "../Components/Note";
import NoteList from "../Components/NoteList";
import { TaskProps } from "../Components/Task";
import TaskList from "../Components/TaskList";
import createToken from "../Services/CreateToken";
import "./Dashboard.scss";

export enum FocusState {
	ADD_TASK,
	EDIT_TASK,
	VIEW_TASK,
	ADD_NOTE,
	EDIT_NOTE,
	VIEW_NOTE
}

export interface FocusInterface {
	focusModal: FocusState;
	setFocusModal: React.Dispatch<React.SetStateAction<FocusState>>;
	data: Record<string, any>;
	setData: React.Dispatch<React.SetStateAction<{}>>;
	tasks: Array<TaskProps>;
	setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
	notes: Array<NoteProps>;
	setNotes: React.Dispatch<React.SetStateAction<NoteProps[]>>;
}

export const DashboardContext = createContext({} as FocusInterface);
export const useDashboard = () => useContext(DashboardContext);

function Dashboard() {
	const [focusModal, setFocusModal] = useState(FocusState.ADD_NOTE);
	const [data, setData] = useState({});
	const [tasks, setTasks] = useState([] as Array<TaskProps>);
	const [notes, setNotes] = useState([] as Array<NoteProps>);
	const { appUser } = useAuth();
	const [cryptoData, setCryptoData] = useState([{ name: "Loading", price_usd: 69.0 }]);
	const value: FocusInterface = { focusModal, setFocusModal, data, setData, tasks, setTasks, notes, setNotes };

	useEffect(() => {
		if (!appUser) return;
		const fetchData = async () => {
			const header = await createToken();
			const tasksRes = await axios.get("/api/tasks", header);
			const notesRes = await axios.get("/api/notes", header);
			setTasks(tasksRes.data);
			setNotes(notesRes.data);
		};
		fetchData();
	}, [appUser]);

	useEffect(() => {
		const fetchCrypto = async () => {
			axios
				.get("https://rest-sandbox.coinapi.io/v1/assets?filter_asset_id=BTC,ETH,ADA", {
					headers: { "X-CoinAPI-Key": "35D5CDA0-95EC-4937-AD77-1CA5934F5077" }
				})
				.then((res) => {
					setCryptoData(res.data);
				});
		};
		fetchCrypto();
	}, []);

	return (
		<DashboardContext.Provider value={value}>
			<div className="dashboard-page">
				<div className="crypto-data">
					{cryptoData.map((coin) => (
						<div>
							<b>{coin.name}</b> ${coin.price_usd.toFixed(2)}
						</div>
					))}
				</div>
				<div className="main-ui">
					<TaskList />
					<NoteList />
					<DashboardFocus />
				</div>
			</div>
		</DashboardContext.Provider>
	);
}

export default Dashboard;
