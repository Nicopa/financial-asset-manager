export abstract class Controller<Request, Response> {
	protected nextController?: Controller<Request, Response>;
	public setNext(
		controller: Controller<Request, Response>,
	): Controller<Request, Response> {
		this.nextController = controller;
		return controller;
	}
	abstract handle(request: Request): Promise<Response>;
}
