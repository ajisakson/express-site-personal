const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-accounts.json");
const decodeIDToken = require("./services/authenticateToken");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://personal-site-57cc8-default-rtdb.firebaseio.com"
});

const port = process.env.PORT || 4001;
let baseUrl = "";

if (port === 4001) {
	baseUrl = path.join(__dirname, "dist/client");
} else {
	baseUrl = path.join(__dirname, "client");
}
app.use(express.static(baseUrl));
app.use(cors());
app.use(decodeIDToken);

app.get("/api", (req: any, res: any) => {
	res.send(true);
});

app.get("/api/login", (req: any, res: any) => {
	const auth = req.currentUser;
	if (auth) {
		return res.send(true);
	}
	return res.status(401).send(false);
});

app.get("*", (req: any, res: any) => {
	res.sendFile(path.join(baseUrl, "/index.html"));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
