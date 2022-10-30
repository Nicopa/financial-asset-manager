import { HTTPController } from "./HTTPController";

export interface HTTP {
	on(
		method:
			| "all"
			| "get"
			| "post"
			| "put"
			| "delete"
			| "patch"
			| "options"
			| "head",
		url: string,
		...controllers: HTTPController[]
	): void;
	listen(port: number): void;
}
