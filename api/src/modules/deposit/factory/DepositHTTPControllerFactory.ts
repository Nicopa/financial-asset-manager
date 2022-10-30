import { EventBroker } from "../../../core/application/event";
import { UUIDProvider } from "../../../core/domain/service/uuid";
import { AccountRepository } from "../../account/repository";
import {
	CreateDeposit,
	CreateDepositHTTPController,
} from "../command/create-deposit";
import {
	DeleteDeposit,
	DeleteDepositHTTPController,
} from "../command/delete-deposit";
import { DepositRepository } from "../repository";
import { DepositHTTPPresenterFactory } from "./DepositHTTPPresenterFactory";

export class DepositHTTPControllerFactory {
	private readonly httpPresenterFactory = new DepositHTTPPresenterFactory();
	constructor(
		private readonly depositRepository: DepositRepository,
		private readonly accountRepository: AccountRepository,
		private readonly uUIDProvider: UUIDProvider,
		private readonly eventBroker: EventBroker,
	) {}
	public makeCreateDepositController() {
		return new CreateDepositHTTPController(
			new CreateDeposit(
				this.depositRepository,
				this.accountRepository,
				this.uUIDProvider,
				this.eventBroker,
			),
			this.httpPresenterFactory.makeCreateDepositPresenter(),
		);
	}
	public makeDeleteDepositController() {
		return new DeleteDepositHTTPController(
			new DeleteDeposit(this.depositRepository, this.eventBroker),
			this.httpPresenterFactory.makeDeleteDepositPresenter(),
		);
	}
}
