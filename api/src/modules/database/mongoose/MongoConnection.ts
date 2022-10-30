import mongoose from "mongoose";
import "dotenv/config";

export const MongoConnection = async (databaseName?: string) => {
	const connection = mongoose.connection;
	connection.on(
		"error",
		console.error.bind(console, "MongoDB connection error: "),
	);
	connection.on("connected", () => {
		if (process.env.NODE_ENV === "development") {
			console.log("MongoDB connected", process.env.NODE_ENV);
		} else if (process.env.NODE_ENV === "test") {
			console.log("Restarting Mongo database...");
			connection.db.dropDatabase();
		}
	});
	await mongoose.connect(
		`mongodb://${process.env.DB_HOST}:27017/${
			databaseName ?? process.env.DATABASE
		}`,
	);
	return connection;
};
