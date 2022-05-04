import * as admin from "firebase-admin";

async function decodeIDToken(req: any, res: any, next: any) {
	const header = req.headers?.authorization;
	if (header !== "Bearer null" && req.headers?.authorization?.startsWith("Bearer ")) {
		const idToken = req.headers.authorization.split("Bearer ")[1];
		try {
			const decodedToken = await admin.auth().verifyIdToken(idToken);
			req["currentUser"] = decodedToken;
		} catch (err) {
			console.log(err);
		}
	}
	next();
}
module.exports = decodeIDToken;
