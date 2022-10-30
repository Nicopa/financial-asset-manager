import mongoose from "mongoose";

export abstract class MongoDatabase {
	protected database: mongoose.Connection;
	constructor(database: mongoose.Connection) {
		this.database = database;
	}
}
