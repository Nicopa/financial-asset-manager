import express, { Express, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { HTTP, HTTPController, HTTPResponse } from "../../../core/infra/http";

export class ExpressHTTP implements HTTP {
	public readonly app: Express;

	constructor() {
		this.app = express();
		this.app.use(cors());
		//this.app.use(express.json());
		this.app.use(bodyParser.json());
		this.app.use(
			(
				request: express.Request,
				response: express.Response,
				next: NextFunction,
			) => {
				response.header("Access-Control-Allow-Origin", "http://localhost:3000");
				response.header(
					"Access-Control-Allow-Header",
					"Origin, X-Requested-With, Content-Type, Accept, Authorization",
				);
				response.header(
					"Access-Control-Allow-Methods",
					"GET, POST, PUT, DELETE, OPTIONS",
				);
				next();
			},
		);
	}
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
	): void {
		this.app[method](
			url,
			async (request: express.Request, response: express.Response) => {
				for (let i = 0; i < controllers.length - 1; i++)
					controllers[i].setNext(controllers[i + 1]);
				const httpResponse: HTTPResponse = await controllers[0].handle(request);
				response.statusCode = httpResponse.statusCode;
				response.json(httpResponse.body);
			},
		);
	}
	listen(port?: number) {
		const server = this.app.listen(port, () => {
			console.log(`[App] Listening on port ${port}`);
		});
		process.on("SIGTERM", () => {
			server.close();
		});
		process.on("SIGKILL", () => {
			server.close();
		});
	}
}
