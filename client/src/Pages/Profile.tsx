import { useNavigate } from "react-router";
import auth from "../Services/AuthInitialize";
import "./Profile.scss";

function Profile() {
	const navigate = useNavigate();

	const logout = () => {
		auth.signOut();
		navigate("/");
	};

	return (
		<div className="profile-page">
			<h2>{auth.currentUser?.email}</h2>
			<button onClick={logout}>Logout</button>
		</div>
	);
}

export default Profile;
