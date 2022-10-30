import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export const MemoryMongoConnection = async () => {
	const mongoMemoryServer = await MongoMemoryServer.create();
	await mongoose.connect(mongoMemoryServer.getUri());
	const connection = mongoose.connection;
	connection.on(
		"error",
		console.error.bind(console, "MongoDB connection error: "),
	);
	return { connection, mongoMemoryServer };
};
