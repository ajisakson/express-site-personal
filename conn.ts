import mongoose from "mongoose";

const connectionString = process.env.ATLAS_URI || "";

module.exports = {
	main: async function () {
		await mongoose.connect(connectionString);
	}
};
