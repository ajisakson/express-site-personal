import { createContext, useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.scss";
import { onAuthStateChanged, User } from "firebase/auth";
import auth from "./Services/AuthInitialize";
import { checkServerStatus } from "./Services/CheckStatus";

export interface AuthInterface {
	appUser: User | null;
	setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const AuthContext = createContext({} as AuthInterface);
export const useAuth = () => useContext(AuthContext);

function App() {
	const [serverStatus, updateServerStatus] = useState(false);
	const [appUser, setUser] = useState({} as User);
	const authHandler: AuthInterface = { appUser, setUser };

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUser(user);
		} else {
			setUser({} as User);
		}
	});

	checkServerStatus().then((response) => updateServerStatus(response));

	return (
		<AuthContext.Provider value={authHandler}>
			<div className="App">
				<div className="header-container">
					<div className="title-container">
						<div>
							byssen<span className="blue">dev</span>
						</div>
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
