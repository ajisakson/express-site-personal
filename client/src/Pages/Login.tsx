import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../Services/AuthInitialize";
import createToken from "../Services/CreateToken";
import "./Login.scss";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const handleSubmit = (e: any) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				navigate("/profile");
			})
			.catch((error) => {
				console.error("Incorrect username or password");
			});
	};

	const checkLoginStatus = async (e: any) => {
		const header = await createToken();
		axios.get("/api/login", header).then((response) => {
			console.log("server auth?", response);
		});
	};

	return (
		<div className="login-page">
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" onChange={({ target }) => setEmail(target.value)} placeholder="Email" />
				<br />
				<input type="password" onChange={({ target }) => setPassword(target.value)} placeholder="Password" />
				<br />
				<button type="submit">Sign in</button>
			</form>
			<button onClick={checkLoginStatus}>Check Login Status</button>
		</div>
	);
}

export default Login;
