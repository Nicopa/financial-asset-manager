export type UseCase<RequestModel, ResponseModel> =
	RequestModel extends undefined
		? () => Promise<ResponseModel>
		: (request: RequestModel) => Promise<ResponseModel>;
