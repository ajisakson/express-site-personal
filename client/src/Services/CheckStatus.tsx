import axios from "axios";
import createToken from "./CreateToken";

export const checkServerStatus = async () => {
	const header = await createToken();
	try {
		const res = await axios.get("/api", header);
		return res.data;
	} catch (e) {
		console.error(e);
	}
};
