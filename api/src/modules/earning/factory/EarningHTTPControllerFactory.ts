import { EventBroker } from "../../../core/application/event";
import { UUIDProvider } from "../../../core/domain/service/uuid";
import { AccountRepository } from "../../account/repository";
import {
	CreateEarning,
	CreateEarningHTTPController,
} from "../command/create-earning";
import {
	DeleteEarning,
	DeleteEarningHTTPController,
} from "../command/delete-earning";
import { EarningDataGateway } from "../data-gateway";
import { GetEarnings, GetEarningsHTTPController } from "../query/get-earnings";
import { EarningRepository } from "../repository";
import { EarningHTTPPresenterFactory } from "./EarningHTTPPresenterFactory";

export class EarningHTTPControllerFactory {
	private readonly httpPresenterFactory = new EarningHTTPPresenterFactory();
	constructor(
		private readonly earningRepository: EarningRepository,
		private readonly accountRepository: AccountRepository,
		private readonly earningDataGateway: EarningDataGateway,
		private readonly uUIDProvider: UUIDProvider,
		private readonly eventBroker: EventBroker,
	) {}
	public makeCreateEarningController() {
		return new CreateEarningHTTPController(
			new CreateEarning(
				this.earningRepository,
				this.accountRepository,
				this.uUIDProvider,
				this.eventBroker,
			),
			this.httpPresenterFactory.makeCreateEarningPresenter(),
		);
	}
	public makeGetEarningsController() {
		return new GetEarningsHTTPController(
			new GetEarnings(this.earningDataGateway),
			this.httpPresenterFactory.makeGetEarningsPresenter(),
		);
	}
	public makeDeleteEarningController() {
		return new DeleteEarningHTTPController(
			new DeleteEarning(this.earningRepository, this.eventBroker),
			this.httpPresenterFactory.makeDeleteEarningPresenter(),
		);
	}
}
