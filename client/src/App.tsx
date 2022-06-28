import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./App.scss";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./Services/AuthInitialize";
import { checkServerStatus } from "./Services/CheckStatus";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function App() {
	const [serverStatus, updateServerStatus] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const particlesInit = async (main: any) => {
		// you can initialize the tsParticles instance (main) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(main);
	};

	onAuthStateChanged(auth, (user) => {
		return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
	});

	checkServerStatus().then((response) => updateServerStatus(response));

	return (
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
					{!isLoggedIn && <Link to="/login">Login</Link>}
					{isLoggedIn && <Link to="/profile">Profile</Link>}
					{isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
				</nav>
			</div>
			{!serverStatus && <div>api down XD</div>}
			<Outlet />
		</div>
	);
}

export default App;
