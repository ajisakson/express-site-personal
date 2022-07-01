import { createContext, useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.scss";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./Services/AuthInitialize";
import { checkServerStatus } from "./Services/CheckStatus";

export const AuthContext = createContext([]);
export const useAuth = () => useContext(AuthContext);

function App() {
	const [serverStatus, updateServerStatus] = useState(false);
	const [appUser, setUser] = useState(null);
	const authHandler = { appUser, setUser };

	onAuthStateChanged(auth, (user) => {
		if (user) {
			console.log(user);
			setUser(user);
		} else {
			setUser(null);
		}
	});

	checkServerStatus().then((response) => updateServerStatus(response));

	return (
		<AuthContext.Provider value={authHandler}>
			<div className="App">
				<div className="header-container">
					<div className="title-container">
						<h1>
							byssen<span className="blue">dev</span>
						</h1>
						<h3>by Austin Isakson</h3>
					</div>
					<nav>
						<Link to="/">Home</Link>
						<Link to="/projects">Projects</Link>
						<Link to="/blog">Blog</Link>
						{!appUser && <Link to="/login">Login</Link>}
						{appUser && <Link to="/profile">Profile</Link>}
						{appUser && <Link to="/dashboard">Dashboard</Link>}
					</nav>
				</div>
				{!serverStatus && <div>api down XD</div>}
				<Outlet />
			</div>
		</AuthContext.Provider>
	);
}

export default App;
