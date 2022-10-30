import { UseCase } from "./UseCase";

export interface Command<RequestModel, ResponseModel> {
	execute: UseCase<RequestModel, ResponseModel>;
}
