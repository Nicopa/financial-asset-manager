import { EventBroker } from "../../../core/application/event";
import { UUIDProvider } from "../../../core/domain/service/uuid";
import { AccountRepository } from "../../account/repository";
import {
	CreateWithdraw,
	CreateWithdrawHTTPController,
} from "../command/create-withdraw";
import {
	DeleteWithdraw,
	DeleteWithdrawHTTPController,
} from "../command/delete-withdraw";
import { WithdrawRepository } from "../repository";
import { WithdrawHTTPPresenterFactory } from "./WithdrawHTTPPresenterFactory";

export class WithdrawHTTPControllerFactory {
	private readonly httpPresenterFactory = new WithdrawHTTPPresenterFactory();
	constructor(
		private readonly withdrawRepository: WithdrawRepository,
		private readonly accountRepository: AccountRepository,
		private readonly uUIDProvider: UUIDProvider,
		private readonly eventBroker: EventBroker,
	) {}
	public makeCreateWithdrawController() {
		return new CreateWithdrawHTTPController(
			new CreateWithdraw(
				this.withdrawRepository,
				this.accountRepository,
				this.uUIDProvider,
				this.eventBroker,
			),
			this.httpPresenterFactory.makeCreateWithdrawPresenter(),
		);
	}
	public makeDeleteWithdrawController() {
		return new DeleteWithdrawHTTPController(
			new DeleteWithdraw(this.withdrawRepository, this.eventBroker),
			this.httpPresenterFactory.makeDeleteWithdrawPresenter(),
		);
	}
}
