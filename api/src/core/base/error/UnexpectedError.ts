import { BaseError } from "./BaseError";

export class UnexpectedError extends BaseError {
	constructor(value: any) {
		super("UNEXPECTED_ERROR", "An unexpected error occurred.");
		console.error(
			this.message,
			typeof value === "object"
				? JSON.stringify(value, undefined, "  ")
				: value,
		);
	}
}
