import express, { Request, Response } from "express";
const cors = require("cors");
const path = require("path");
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-accounts.json");
const decodeIDToken = require("./services/authenticateToken");
require("dotenv").config();
const conn = require("./conn");
const { v4: uuidv4 } = require("uuid");
const users = require("./routes/users");
const port = process.env.PORT || 4001;
const baseUrl = port === 4001 ? path.join(__dirname, "dist/client") : path.join(__dirname, "client");

app.use(express.static(baseUrl));
app.use(cors());
app.use(decodeIDToken);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://personal-site-57cc8-default-rtdb.firebaseio.com"
});

conn.connectToServer(() => {
	console.log("Successfully connected to MongoDB.");
});
app.get("/api", (req: Request, res: Response) => {
	res.send(true);
});

app.use("/api/users", users);

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.join(baseUrl, "/index.html"));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
