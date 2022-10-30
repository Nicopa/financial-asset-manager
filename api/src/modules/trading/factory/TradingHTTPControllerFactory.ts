import { EventBroker } from "../../../core/application/event";
import { UUIDProvider } from "../../../core/domain/service/uuid";
import { AccountRepository } from "../../account/repository";
import { AssetRepository } from "../../asset/repository";
import { WalletRepository } from "../../wallet/repository";
import {
	CreateTrading,
	CreateTradingHTTPController,
} from "../command/create-trading";
import {
	DeleteTrading,
	DeleteTradingHTTPController,
} from "../command/delete-trading";
import { TradingDataGateway } from "../data-gateway";
import { GetTradings, GetTradingsHTTPController } from "../query/get-tradings";
import { TradingRepository } from "../repository";
import { TradingHTTPPresenterFactory } from "./TradingHTTPPresenterFactory";

export class TradingHTTPControllerFactory {
	private readonly httpPresenterFactory = new TradingHTTPPresenterFactory();
	constructor(
		private readonly tradingRepository: TradingRepository,
		private readonly accountRepository: AccountRepository,
		private readonly assetRepository: AssetRepository,
		private readonly walletRepository: WalletRepository,
		private readonly tradingDataGateway: TradingDataGateway,
		private readonly eventBroker: EventBroker,
		private readonly uUIDProvider: UUIDProvider,
	) {}
	public makeCreateTradingController() {
		return new CreateTradingHTTPController(
			new CreateTrading(
				this.tradingRepository,
				this.accountRepository,
				this.assetRepository,
				this.uUIDProvider,
				this.eventBroker,
			),
			this.httpPresenterFactory.makeCreateTradingPresenter(),
		);
	}
	public makeGetTradingsController() {
		return new GetTradingsHTTPController(
			new GetTradings(this.tradingDataGateway),
			this.httpPresenterFactory.makeGetTradingsPresenter(),
		);
	}
	public makeDeleteTradingController() {
		return new DeleteTradingHTTPController(
			new DeleteTrading(
				this.tradingRepository,
				this.walletRepository,
				this.eventBroker,
			),
			this.httpPresenterFactory.makeDeleteTradingPresenter(),
		);
	}
}
