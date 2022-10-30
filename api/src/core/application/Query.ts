import { UseCase } from "./UseCase";

export interface Query<RequestModel, ResponseModel> {
	get: UseCase<RequestModel, ResponseModel>;
}
