const { MongoClient } = require("mongodb");

const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

let dbConnection: any;

module.exports = {
	connectToServer: function (callback: any) {
		client.connect(function (err: any, db: any) {
			if (err || !db) {
				return callback(err);
			}

			dbConnection = db.db("test");

			return callback();
		});
	},

	getDb: function () {
		return dbConnection;
	}
};
