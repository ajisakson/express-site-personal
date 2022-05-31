import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./App.scss";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./Services/AuthInitialize";
import { checkServerStatus } from "./Services/CheckStatus";

function App() {
	const [serverStatus, updateServerStatus] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	onAuthStateChanged(auth, (user) => {
		return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
	});

	checkServerStatus().then((response) => updateServerStatus(response));

	return (
		<div className="App">
			<div className="header-container">
				<div className="title-container">
					<h1>
						isakson.<span className="blue">austin()</span>
					</h1>
					<h3>put something here</h3>
				</div>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/projects">Projects</Link>
					<Link to="/blog">Blog</Link>
					{!isLoggedIn && <Link to="/login">Login</Link>}
					{isLoggedIn && <Link to="/profile">Profile</Link>}
				</nav>
			</div>
			<div className="api-status">Api Active? {serverStatus ? "true" : "false"}</div>
			<Outlet />
		</div>
	);
}

export default App;
