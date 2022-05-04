import auth from "./AuthInitialize";

const createToken = async () => {
	const user = auth.currentUser;
	const token = user && (await user.getIdToken());
	const payloadHeader = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	};
	return payloadHeader;
};

export default createToken;
